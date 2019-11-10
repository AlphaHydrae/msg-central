import { EventLogState, initialEventLogState } from '../../components/event-log/event-log.state';
import { initialWampCallFormState, WampCallFormState } from '../../components/wamp-call-form/wamp-call-form.state';
import { initialWampConnectionFormState, WampConnectionFormState } from '../../components/wamp-connection-form/wamp-connection-form.state';
import { initialWampSubscriptionFormState, WampSubscriptionFormState } from '../../components/wamp-subscription-form/wamp-subscription-form.state';
import { initialWsConnectionFormState, WsConnectionFormState } from '../../components/ws-connection-form/ws-connection-form.state';
import { initialWsMessageFormState, WsMessageFormState } from '../../components/ws-message-form/ws-message-form.state';

export interface ControlState {
  readonly eventLog: EventLogState;
  readonly ready: boolean;
  readonly wampCallForm: WampCallFormState;
  readonly wampConnectionForm: WampConnectionFormState;
  readonly wampSubscriptionForm: WampSubscriptionFormState;
  readonly wsConnectionForm: WsConnectionFormState;
  readonly wsMessageForm: WsMessageFormState;
}

export const initialControlState: ControlState = {
  eventLog: initialEventLogState,
  ready: false,
  wampCallForm: initialWampCallFormState,
  wampConnectionForm: initialWampConnectionFormState,
  wampSubscriptionForm: initialWampSubscriptionFormState,
  wsConnectionForm: initialWsConnectionFormState,
  wsMessageForm: initialWsMessageFormState
};