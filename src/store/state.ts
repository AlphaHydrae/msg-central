import { RouterState } from 'connected-react-router';

import { ControlState, initialControlState } from '../concerns/control/control.state';
import { DataState, initialDataState } from '../concerns/data/data.state';
import { initialRouterState } from '../concerns/router/router.state';
import { initialSessionState, SessionState } from '../concerns/session/session.state';

export interface AppState {
  readonly control: ControlState;
  readonly data: DataState;
  readonly router: RouterState;
  readonly session: SessionState;
}

export type SavedState = Pick<AppState, 'session'>;

export const initialAppState: AppState = {
  control: initialControlState,
  data: initialDataState,
  router: initialRouterState,
  session: initialSessionState
};