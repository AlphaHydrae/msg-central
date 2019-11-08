import { combineReducers } from 'redux';

import { wampConnectionFormReducer } from '../../components/wamp-connection-form/wamp-connection-form.reducers';
import { wampSubscriptionsReducer } from '../../domain/wamp/wamp.reducers';
import { SessionState } from './session.state';

export const sessionReducer = combineReducers<SessionState>({
  wampConnectionForm: wampConnectionFormReducer,
  wampSubscriptions: wampSubscriptionsReducer
});