import { RouterState } from 'connected-react-router';

import { initialRouterState } from '../concerns/router/router.state';
import { initialSessionState, SessionState } from '../concerns/session/session.state';

export interface AppState {
  readonly router: RouterState;
  readonly session: SessionState;
}

export const initialAppState: AppState = {
  router: initialRouterState,
  session: initialSessionState
};