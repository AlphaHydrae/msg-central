import { initialWampConnectionFormState, WampConnectionFormState } from '../../components/wamp-connection-form/wamp-connection-form.state';
import { initialWampSubscriptionFormState, WampSubscriptionFormState } from '../../components/wamp-subscription-form/wamp-subscription-form.state';

export interface ControlState {
  readonly ready: boolean;
  readonly wampConnectionForm: WampConnectionFormState;
  readonly wampSubscriptionForm: WampSubscriptionFormState;
}

export const initialControlState: ControlState = {
  ready: false,
  wampConnectionForm: initialWampConnectionFormState,
  wampSubscriptionForm: initialWampSubscriptionFormState
};