import { combineReducers } from 'redux';

import { routerReducer } from '../concerns/router/router.reducers';
import { AppState } from './state';

export const rootReducer = combineReducers<AppState>({
  router: routerReducer
});