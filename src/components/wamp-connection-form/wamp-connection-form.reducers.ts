import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editWampConnectionForm } from './wamp-connection-form.actions';
import { initialWampConnectionFormState } from './wamp-connection-form.state';

export const wampConnectionFormReducer = reducerWithInitialState(initialWampConnectionFormState)
  .case(editWampConnectionForm, (state, payload) => ({ ...state, ...payload }))
;