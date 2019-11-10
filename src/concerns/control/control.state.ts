import { EventLogState, initialEventLogState } from '../../components/event-log/event-log.state';
import { initialWampConnectionFormState, WampConnectionFormState } from '../../components/wamp-connection-form/wamp-connection-form.state';
import { initialWampSubscriptionFormState, WampSubscriptionFormState } from '../../components/wamp-subscription-form/wamp-subscription-form.state';

export interface ControlState {
  readonly eventLog: EventLogState;
  readonly ready: boolean;
  readonly wampConnectionForm: WampConnectionFormState;
  readonly wampSubscriptionForm: WampSubscriptionFormState;
}

export const initialControlState: ControlState = {
  eventLog: initialEventLogState,
  ready: false,
  wampConnectionForm: initialWampConnectionFormState,
  wampSubscriptionForm: initialWampSubscriptionFormState
};