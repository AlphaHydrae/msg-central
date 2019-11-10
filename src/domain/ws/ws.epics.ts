import { Action } from 'redux';
import { from, Observable } from 'rxjs';
import { filter, first, ignoreElements, map, mergeMap, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { AppEpicDependencies } from '../../store/epics';
import { loadSavedState } from '../../store/storage';
import { createEpic } from '../../utils/store';
import { connectToWsServer, disconnectFromWsServer, handleWsConnectionClosed, handleWsMessage } from './ws.actions';
import { selectWsConnections } from './ws.selectors';
import { WsConnectionParams } from './ws.state';

export const connectToWsServerEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(connectToWsServer.started.match),
  mergeMap(action => connect(action.payload, deps))
));

export const disconnectFromWsServerEpic = createEpic((action$, _, deps) => action$.pipe(
  filter(disconnectFromWsServer.match),
  tap(action => {

    const ws = deps.ws.get(action.payload.id);
    if (!ws) {
      return console.warn(`WebSocket connection ${action.payload.id} unavailable`);
    }

    ws.close();
  }),
  ignoreElements()
));

export const reconnectToWsServerEpic = createEpic((action$, state$) => action$.pipe(
  filter(loadSavedState.match),
  switchMapTo(state$.pipe(map(selectWsConnections), first())),
  switchMap(connections => from(connections.map(conn => connectToWsServer.started(conn))))
));

function connect(params: WsConnectionParams, deps: AppEpicDependencies): Observable<Action> {
  return new Observable(observer => {

    const ws = new WebSocket(params.serverUrl);
    deps.ws.set(params.id, ws);

    let connected: boolean | undefined;
    ws.onopen = () => {
      if (!connected) {
        connected = true;
        observer.next(connectToWsServer.done({ params }));
      }
    };

    ws.onmessage = message => {
      observer.next(handleWsMessage({
        data: message.data,
        id: params.id
      }));
    };

    ws.onclose = event => {
      if (connected === true) {
        return observer.next(handleWsConnectionClosed({ params, code: event.code, reason: event.reason }));
      } else if (connected === undefined) {
        return;
      }

      observer.next(connectToWsServer.failed({
        params,
        error: { message: '' }
      }));

      observer.complete();
      deps.ws.delete(params.id);
    };

    ws.onerror = () => {
      if (connected !== false) {
        return;
      }

      observer.next(connectToWsServer.failed({
        params,
        error: { message: 'An unexpected error occurred' }
      }));
    };
  });
}