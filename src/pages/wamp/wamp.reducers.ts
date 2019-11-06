import { combineReducers } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editWampConnectionForm } from './wamp.actions';
import { initialWampPageState, WampPageState } from './wamp.state';

const connectionParamsReducer = reducerWithInitialState(initialWampPageState.connectionParams)
  .case(editWampConnectionForm, (state, payload) => ({ ...state, ...payload }))
;

export const wampPageReducer = combineReducers<WampPageState>({
  connectionParams: connectionParamsReducer
});