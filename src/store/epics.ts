import { Connection } from 'autobahn';
import { AnyAction } from 'redux';
import { combineEpics } from 'redux-observable';
import WebSocket from 'ws';

import { connectToWampRouterEpic, disconnectFromWampRouterEpic, submitWampConnectionFormEpic } from '../domain/wamp/wamp.epics';
import { AppState } from './state';

export interface AppEpicDependencies {
  wamp?: Connection;
  ws?: WebSocket;
}

export const rootEpic = combineEpics<AnyAction, AnyAction, AppState, AppEpicDependencies>(
  connectToWampRouterEpic,
  disconnectFromWampRouterEpic,
  submitWampConnectionFormEpic
);