import { constant } from 'lodash';
import { combineReducers } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { eventLogReducer } from '../../components/event-log/event-log.reducers';
import { wampCallFormReducer } from '../../components/wamp-call-form/wamp-call-form.reducers';
import { wampConnectionFormReducer } from '../../components/wamp-connection-form/wamp-connection-form.reducers';
import { wampSubscriptionFormReducer } from '../../components/wamp-subscription-form/wamp-subscription-form.reducers';
import { wsConnectionFormReducer } from '../../components/ws-connection-form/ws-connection-form.reducers';
import { loadSavedState } from '../../store/storage';
import { ControlState, initialControlState } from './control.state';

const readyReducer = reducerWithInitialState(initialControlState.ready)
  .case(loadSavedState, constant(true))
;

export const controlReducer = combineReducers<ControlState>({
  eventLog: eventLogReducer,
  ready: readyReducer,
  wampCallForm: wampCallFormReducer,
  wampConnectionForm: wampConnectionFormReducer,
  wampSubscriptionForm: wampSubscriptionFormReducer,
  wsConnectionForm: wsConnectionFormReducer
});