import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editWampCallForm } from './wamp-call-form.actions';
import { initialWampCallFormState } from './wamp-call-form.state';

export const wampCallFormReducer = reducerWithInitialState(initialWampCallFormState)

  .case(
    editWampCallForm,
    (state, payload) => ({ ...state, ...payload })
  )

;