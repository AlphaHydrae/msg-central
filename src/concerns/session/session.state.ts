import { initialWampPageState, WampPageState } from '../../pages/wamp/wamp.state';

export interface SessionState {
  readonly wampPage: WampPageState;
}

export const initialSessionState: SessionState = {
  wampPage: initialWampPageState
};