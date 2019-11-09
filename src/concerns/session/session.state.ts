import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampSubscriptionParams } from '../../domain/wamp/wamp.state';
import { Dictionary } from '../../utils/types';

export interface SessionState {
  readonly wampConnections: Dictionary<WampConnectionParams>;
  readonly wampSubscriptions: Dictionary<WampSubscriptionParams>;
}

export const initialSessionState: SessionState = {
  wampConnections: {},
  wampSubscriptions: {}
};