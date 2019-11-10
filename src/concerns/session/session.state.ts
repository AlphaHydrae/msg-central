import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampSubscriptionParams } from '../../domain/wamp/wamp.state';
import { WsConnectionParams } from '../../domain/ws/ws.state';
import { Dictionary } from '../../utils/types';

export interface SessionState {
  readonly wampConnections: Dictionary<WampConnectionParams>;
  readonly wampSubscriptions: Dictionary<WampSubscriptionParams>;
  readonly wsConnections: Dictionary<WsConnectionParams>;
}

export const initialSessionState: SessionState = {
  wampConnections: {},
  wampSubscriptions: {},
  wsConnections: {}
};