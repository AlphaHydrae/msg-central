import { Connection, IConnectionOptions } from 'autobahn';
import { constant } from 'lodash';
import { Action } from 'redux';
import { Observable, of } from 'rxjs';
import { catchError, filter, first, ignoreElements, map, mergeMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';

import { connectToWampRouter, submitWampConnectionForm } from '../../components/wamp-connection-form/wamp-connection-form.actions';
import { selectWampConnectionFormParams } from '../../components/wamp-connection-form/wamp-connection-form.selectors';
import { disconnectFromWampRouter } from '../../pages/wamp/wamp-page.actions';
import { AppEpicDependencies } from '../../store/epics';
import { createEpic } from '../../utils/store';
import { handleWampConnectionClosed } from './wamp.actions';
import { WampConnectionParams } from './wamp.connection-params';

export const connectToWampRouterEpic = createEpic((action$, state$, deps) => action$.pipe(
  filter(connectToWampRouter.started.match),
  withLatestFrom(state$.pipe(map(selectWampConnectionFormParams))),
  mergeMap(([ _, params ]) => connect(params, deps).pipe(
    catchError(error => of(connectToWampRouter.failed({ error, params })))
  ))
));

export const disconnectFromWampRouterEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(disconnectFromWampRouter.match),
  tap(() => deps.wamp && deps.wamp.close()),
  ignoreElements()
));

export const submitWampConnectionFormEpic = createEpic((action$, state$) => action$.pipe(
  filter(submitWampConnectionForm.match),
  switchMapTo(state$.pipe(map(selectWampConnectionFormParams), first())),
  map(params => connectToWampRouter.started(params))
));

function connect(params: WampConnectionParams, deps: AppEpicDependencies): Observable<Action> {

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

  const connection = new Connection(connectionOptions);
  connection.open();

  deps.wamp = connection;

  return new Observable(observer => {

    let connected = false;
    connection.onopen = () => {
      if (!connected) {
        connected = true;
        observer.next(connectToWampRouter.done({ params }));
      }
    };

    connection.onclose = (reason, details) => {
      if (connected) {
        observer.next(handleWampConnectionClosed());
      } else {
        observer.next(connectToWampRouter.failed({
          params,
          error: { reason, details }
        }));
      }

      return true;
    };
  });
}