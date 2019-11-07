import { initialWampConnectionFormState, WampConnectionFormState } from '../../components/wamp-connection-form/wamp-connection-form.state';

export interface SessionState {
  readonly wampConnectionForm: WampConnectionFormState;
}

export const initialSessionState: SessionState = {
  wampConnectionForm: initialWampConnectionFormState
};