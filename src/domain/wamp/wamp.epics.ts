import { Connection, Error as AutobahnError, IConnectionOptions } from 'autobahn';
import { constant } from 'lodash';
import { Action } from 'redux';
import { from, Observable, Observer, of, throwError } from 'rxjs';
import { catchError, filter, first, ignoreElements, map, mergeMap, switchMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';
import uuid from 'uuid/v4';

import { submitWampConnectionForm } from '../../components/wamp-connection-form/wamp-connection-form.actions';
import { selectWampConnectionFormParams } from '../../components/wamp-connection-form/wamp-connection-form.selectors';
import { submitWampSubscriptionForm } from '../../components/wamp-subscription-form/wamp-subscription-form.actions';
import { AppEpicDependencies } from '../../store/epics';
import { createEpic } from '../../utils/store';
import { connectToWampRouter, disconnectFromWampRouter, handleWampConnectionClosed, handleWampError, handleWampTopicEvent, subscribeToWampTopic, WampClientError, unsubscribeFromWampTopic } from './wamp.actions';
import { WampConnectionParams } from './wamp.connection-params';
import { selectWampSubscriptions } from './wamp.selectors';
import { WampErrorType, WampSubscription } from './wamp.state';

export const connectToWampRouterEpic = createEpic((action$, state$, deps) => action$.pipe(
  filter(connectToWampRouter.started.match),
  withLatestFrom(state$.pipe(map(selectWampConnectionFormParams))),
  mergeMap(([ _, params ]) => connect(params, deps))
));

export const disconnectFromWampRouterEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(disconnectFromWampRouter.match),
  tap(() => deps.wamp && deps.wamp.close()),
  ignoreElements()
));

export const resubscribeToWampTopicsEpic = createEpic((action$, state$) => action$.pipe(
  filter(connectToWampRouter.done.match),
  switchMapTo(state$.pipe(map(selectWampSubscriptions), first())),
  switchMap(wampSubscriptions => from(wampSubscriptions.map(sub => subscribeToWampTopic.started(sub))))
));

export const submitWampConnectionFormEpic = createEpic((action$, state$) => action$.pipe(
  filter(submitWampConnectionForm.match),
  switchMapTo(state$.pipe(map(selectWampConnectionFormParams), first())),
  map(params => connectToWampRouter.started(params))
));

export const submitWampSubscriptionFormEpic = createEpic(action$ => action$.pipe(
  filter(submitWampSubscriptionForm.match),
  map(action => subscribeToWampTopic.started({
    id: uuid(),
    topic: action.payload.topic
  }))
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

    // Using any here because error-handling callbacks are not in the type
    // definitions.
    const connectionOptionsWithHandlers: any = {
      ...connectionOptions,
      on_internal_error: createErrorHandler('internalError', observer),
      on_user_error: createErrorHandler('userError', observer)
    };

    const connection = new Connection(connectionOptionsWithHandlers);
    deps.wamp = connection;

    connection.open();

    let connected = false;
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
      deps.wamp = undefined;
      deps.wampSubscriptions = {};

      return true;
    };
  });
}

function subscribe(params: WampSubscription, deps: AppEpicDependencies): Observable<Action> {
  if (!deps.wamp) {
    return throwError(new Error('WAMP connection unavailable'));
  }

  const session = deps.wamp.session;
  if (!session) {
    return throwError(new Error('WAMP session unavailable'));
  }

  return new Observable(observer => {
    // FIXME: complete observables
    session.subscribe(params.topic, (args, kwargs, details) => observer.next(handleWampTopicEvent({
      event: { args, kwargs, details },
      subscriptionId: params.id
    }))).then(sub => {
      deps.wampSubscriptions[params.id] = sub;
      observer.next(subscribeToWampTopic.done({ params }));
    });
  });
}

function unsubscribe(subscription: WampSubscription, deps: AppEpicDependencies) {

  const wampSubscription = deps.wampSubscriptions[subscription.id];
  if (!wampSubscription) {
    return throwError(new Error(`WAMP subscription ${subscription.id} unavailable`));
  }

  return from(wampSubscription.unsubscribe().then(() => unsubscribeFromWampTopic.done({ params: subscription })));
}

function createErrorHandler(type: WampErrorType, observer: Observer<Action>) {
  return (error: unknown, customErrorMessage: unknown) => observer.next(handleWampError({
    type,
    customErrorMessage: serializeError(customErrorMessage),
    error: serializeError(error)
  }));
}

function serializeError(err: unknown) {
  if (typeof err === 'string') {
    return err;
  } else if (err instanceof Error) {
    return {
      message: err.message,
      stack: err.stack
    };
  }

  return JSON.stringify(err);
}

function serializeWampClientError(err: unknown): WampClientError {
  if (typeof err === 'string') {
    return {
      message: err,
      args: [],
      kwargs: {}
    };
  } else if (err instanceof AutobahnError) {
    return {
      message: err.error,
      args: err.args,
      kwargs: err.kwargs
    };
  } else if (err instanceof Error) {
    return {
      message: err.message,
      stack: err.stack,
      args: [],
      kwargs: {}
    };
  }

  return {
    message: 'An unexpected error occurred',
    args: [],
    kwargs: {}
  };
}