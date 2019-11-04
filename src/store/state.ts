import { RouterState } from 'connected-react-router';

import { initialRouterState } from '../concerns/router/router.state';

export interface AppState {
  readonly router: RouterState;
}

export const initialAppState: AppState = {
  router: initialRouterState
};