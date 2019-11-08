import { initialWampConnectionFormState, WampConnectionFormState } from '../../components/wamp-connection-form/wamp-connection-form.state';
import { WampSubscription } from '../../domain/wamp/wamp.state';
import { Dictionary } from '../../utils/types';

export interface SessionState {
  readonly wampConnectionForm: WampConnectionFormState;
  readonly wampSubscriptions: Dictionary<WampSubscription>;
}

export const initialSessionState: SessionState = {
  wampConnectionForm: initialWampConnectionFormState,
  wampSubscriptions: {}
};