import { combineReducers } from 'redux';

import { wampConnectionsReducer, wampSubscriptionsReducer } from '../../domain/wamp/wamp.reducers';
import { wsConnectionsReducer } from '../../domain/ws/ws.reducers';
import { SessionState } from './session.state';

export const sessionReducer = combineReducers<SessionState>({
  wampConnections: wampConnectionsReducer,
  wampSubscriptions: wampSubscriptionsReducer,
  wsConnections: wsConnectionsReducer
});