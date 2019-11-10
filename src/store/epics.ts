import { Connection, Subscription } from 'autobahn';
import { AnyAction } from 'redux';
import { combineEpics } from 'redux-observable';
import WebSocket from 'ws';

import { connectToWampRouterEpic, disconnectFromWampRouterEpic, reconnectToWampRouterEpic, resubscribeToWampTopicsEpic, subscribeToWampTopicEpic, unsubscribeFromWampTopicEpic } from '../domain/wamp/wamp.epics';
import { AppState } from './state';

export interface AppEpicDependencies {
  wamp: Map<string, { connection: Connection; subscriptions: Map<string, Subscription> }>;
  ws: Map<string, WebSocket>;
}

export const rootEpic = combineEpics<AnyAction, AnyAction, AppState, AppEpicDependencies>(
  connectToWampRouterEpic,
  disconnectFromWampRouterEpic,
  reconnectToWampRouterEpic,
  resubscribeToWampTopicsEpic,
  subscribeToWampTopicEpic,
  unsubscribeFromWampTopicEpic
);