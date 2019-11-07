import { RouterState } from 'connected-react-router';

import { DataState, initialDataState } from '../concerns/data/data.state';
import { initialRouterState } from '../concerns/router/router.state';
import { initialSessionState, SessionState } from '../concerns/session/session.state';

export interface AppState {
  readonly data: DataState;
  readonly router: RouterState;
  readonly session: SessionState;
}

export const initialAppState: AppState = {
  data: initialDataState,
  router: initialRouterState,
  session: initialSessionState
};