import { Connection, IConnectionOptions, Subscription } from 'autobahn';
import { constant } from 'lodash';
import { Action } from 'redux';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, filter, first, ignoreElements, map, mergeMap, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { AppEpicDependencies } from '../../store/epics';
import { loadSavedState } from '../../store/storage';
import { createEpic, serializeError } from '../../utils/store';
import { callWampProcedure, connectToWampRouter, disconnectFromWampRouter, handleWampConnectionClosed, handleWampError, handleWampTopicEvent, subscribeToWampTopic, unsubscribeFromWampTopic } from './wamp.actions';
import { WampConnectionParams } from './wamp.connection-params';
import { selectWampConnections, selectWampSubscriptions } from './wamp.selectors';
import { WampCallParams, WampSubscriptionParams } from './wamp.state';
import { serializeWampClientError } from './wamp.utils';

export const callWampProcedureEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(callWampProcedure.started.match),
  mergeMap(action => callProcedure(action.payload, deps).pipe(
    catchError(err => of(callWampProcedure.failed({ params: action.payload, error: serializeWampClientError(err) })))
  ))
));

export const connectToWampRouterEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(connectToWampRouter.started.match),
  mergeMap(action => connect(action.payload, deps))
));

export const disconnectFromWampRouterEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(disconnectFromWampRouter.match),
  tap(action => {

    const wamp = deps.wamp.get(action.payload.id);
    if (!wamp) {
      return console.warn(`WAMP connection ${action.payload.id} unavailable`);
    }

    wamp.connection.close();
  }),
  ignoreElements()
));

export const reconnectToWampRouterEpic = createEpic((action$, state$) => action$.pipe(
  filter(loadSavedState.match),
  switchMapTo(state$.pipe(map(selectWampConnections), first())),
  switchMap(connections => from(connections.map(conn => connectToWampRouter.started(conn))))
));

export const resubscribeToWampTopicsEpic = createEpic((action$, state$) => action$.pipe(
  filter(connectToWampRouter.done.match),
  switchMapTo(state$.pipe(map(selectWampSubscriptions), first())),
  switchMap(wampSubscriptions => from(wampSubscriptions.map(sub => subscribeToWampTopic.started(sub))))
));

export const subscribeToWampTopicEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(subscribeToWampTopic.started.match),
  mergeMap(action => subscribe(action.payload, deps).pipe(
    catchError(err => of(subscribeToWampTopic.failed({ params: action.payload, error: serializeWampClientError(err) })))
  ))
));

export const unsubscribeFromWampTopicEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(unsubscribeFromWampTopic.started.match),
  switchMap(action => unsubscribe(action.payload, deps).pipe(
    catchError(err => of(unsubscribeFromWampTopic.failed({ params: action.payload, error: serializeWampClientError(err) })))
  ))
));

function callProcedure(params: WampCallParams, deps: AppEpicDependencies): Observable<Action> {

  const wamp = deps.wamp.get(params.connectionId);
  if (!wamp) {
    return throwError(new Error(`WAMP connection ${params.connectionId} unavailable`));
  }

  const session = wamp.connection.session;
  if (!session) {
    return throwError(new Error(`WAMP session unavailable for connection ${params.connectionId}`));
  }

  return from(session.call(params.procedure, params.args, params.kwargs).then(result => {
    return callWampProcedure.done({ params, result });
  }));
}

function connect(params: WampConnectionParams, deps: AppEpicDependencies): Observable<Action> {
  return new Observable(observer => {

    const connectionOptions: IConnectionOptions = {
      url: params.routerUrl,
      realm: params.realm
    };

    if (params.auth && params.auth.method === 'ticket') {
      const ticket = params.auth.ticket;
      connectionOptions.authid = params.auth.id;
      connectionOptions.authmethods = [ params.auth.method ];
      connectionOptions.onchallenge = constant(ticket);
    }

    let connected = false;

    // Using any here because error-handling callbacks are not in the type
    // definitions.
    const connectionOptionsWithHandlers: any = {
      ...connectionOptions,
      on_internal_error: (error: unknown, customErrorMessage: unknown) => {
        if (!connected) {

          observer.next(connectToWampRouter.failed({
            params,
            error: {
              reason: 'internalError',
              details: { customErrorMessage, error: serializeError(error) }
            }
          }));

          observer.complete();
          deps.wamp.delete(params.id);

          return;
        }

        observer.next(handleWampError({
          type: 'internalError',
          customErrorMessage: serializeError(customErrorMessage),
          error: serializeError(error)
        }));
      },
      on_user_error: (error: unknown, customErrorMessage: unknown) => observer.next(handleWampError({
        type: 'userError',
        customErrorMessage: serializeError(customErrorMessage),
        error: serializeError(error)
      }))
    };

    const connection = new Connection(connectionOptionsWithHandlers);
    deps.wamp.set(params.id, { connection, subscriptions: new Map() });

    connection.open();

    connection.onopen = () => {
      if (!connected) {
        connected = true;
        observer.next(connectToWampRouter.done({ params }));
      }
    };

    connection.onclose = (reason, details) => {
      if (connected) {
        observer.next(handleWampConnectionClosed({ details, params, reason }));
      } else {
        observer.next(connectToWampRouter.failed({
          params,
          error: { reason, details }
        }));
      }

      observer.complete();
      deps.wamp.delete(params.id);

      return true;
    };
  });
}

function subscribe(params: WampSubscriptionParams, deps: AppEpicDependencies): Observable<Action> {

  const wamp = deps.wamp.get(params.connectionId);
  if (!wamp) {
    return throwError(new Error(`WAMP connection ${params.connectionId} unavailable`));
  }

  const session = wamp.connection.session;
  if (!session) {
    return throwError(new Error(`WAMP session unavailable for connection ${params.connectionId}`));
  }

  let subscription: Subscription | undefined;
  return new Observable(observer => {
    // FIXME: complete observables
    session.subscribe(params.topic, (args, kwargs, details) => subscription && observer.next(handleWampTopicEvent({
      connectionId: params.connectionId,
      event: { args, kwargs, details },
      subscriptionId: params.id
    }))).then(sub => {
      subscription = sub;
      wamp.subscriptions.set(params.id, sub);
      observer.next(subscribeToWampTopic.done({ params }));
    });
  });
}

function unsubscribe(subscription: WampSubscriptionParams, deps: AppEpicDependencies) {

  const wamp = deps.wamp.get(subscription.connectionId);
  if (!wamp) {
    return throwError(new Error(`WAMP connection ${subscription.connectionId} unavailable for subscription ${subscription.id}`));
  }

  const wampSubscription = wamp.subscriptions.get(subscription.id);
  if (!wampSubscription) {
    return throwError(new Error(`WAMP subscription ${subscription.id} unavailable for connection ${subscription.id}`));
  }

  return from(wampSubscription.unsubscribe().then(() => unsubscribeFromWampTopic.done({ params: subscription })));
}