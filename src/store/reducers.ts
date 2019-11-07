import { combineReducers } from 'redux';

import { dataReducer } from '../concerns/data/data.reducers';
import { routerReducer } from '../concerns/router/router.reducers';
import { sessionReducer } from '../concerns/session/session.reducers';
import { AppState } from './state';

export const rootReducer = combineReducers<AppState>({
  data: dataReducer,
  router: routerReducer,
  session: sessionReducer
});