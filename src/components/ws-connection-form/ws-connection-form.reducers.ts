import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editWsConnectionForm } from './ws-connection-form.actions';
import { initialWsConnectionFormState } from './ws-connection-form.state';

export const wsConnectionFormReducer = reducerWithInitialState(initialWsConnectionFormState)
  .case(editWsConnectionForm, (state, payload) => ({ ...state, ...payload }))
;