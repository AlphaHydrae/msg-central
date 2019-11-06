import { combineReducers } from 'redux';

import { wampPageReducer } from '../../pages/wamp/wamp.reducers';
import { SessionState } from './session.state';

export const sessionReducer = combineReducers<SessionState>({
  wampPage: wampPageReducer
});