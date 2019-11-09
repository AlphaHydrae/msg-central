import { initialWampSubscriptionFormState, WampSubscriptionFormState } from '../../components/wamp-subscription-form/wamp-subscription-form.state';

export interface ControlState {
  readonly ready: boolean;
  readonly wampSubscriptionForm: WampSubscriptionFormState;
}

export const initialControlState: ControlState = {
  ready: false,
  wampSubscriptionForm: initialWampSubscriptionFormState
};