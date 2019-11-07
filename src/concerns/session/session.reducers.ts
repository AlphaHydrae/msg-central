import { combineReducers } from 'redux';

import { wampConnectionFormReducer } from '../../components/wamp-connection-form/wamp-connection-form.reducers';
import { SessionState } from './session.state';

export const sessionReducer = combineReducers<SessionState>({
  wampConnectionForm: wampConnectionFormReducer
});