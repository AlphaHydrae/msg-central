import { constant } from 'lodash';
import { combineReducers } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { eventLogReducer } from '../../components/event-log/event-log.reducers';
import { wampConnectionFormReducer } from '../../components/wamp-connection-form/wamp-connection-form.reducers';
import { wampSubscriptionFormReducer } from '../../components/wamp-subscription-form/wamp-subscription-form.reducers';
import { loadSavedState } from '../../store/storage';
import { ControlState, initialControlState } from './control.state';

const readyReducer = reducerWithInitialState(initialControlState.ready)
  .case(loadSavedState, constant(true))
;

export const controlReducer = combineReducers<ControlState>({
  eventLog: eventLogReducer,
  ready: readyReducer,
  wampConnectionForm: wampConnectionFormReducer,
  wampSubscriptionForm: wampSubscriptionFormReducer
});