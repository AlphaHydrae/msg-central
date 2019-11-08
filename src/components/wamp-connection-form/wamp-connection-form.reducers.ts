import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { loadSavedState } from '../../store/storage';
import { editWampConnectionForm } from './wamp-connection-form.actions';
import { initialWampConnectionFormState } from './wamp-connection-form.state';

export const wampConnectionFormReducer = reducerWithInitialState(initialWampConnectionFormState)
  .case(editWampConnectionForm, (state, payload) => ({ ...state, ...payload }))
  .case(loadSavedState, (_, payload) => payload.session.wampConnectionForm)
;