import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { editWsMessageForm } from './ws-message-form.actions';
import { initialWsMessageFormState } from './ws-message-form.state';

export const wsMessageFormReducer = reducerWithInitialState(initialWsMessageFormState)

  .case(
    editWsMessageForm,
    (state, payload) => ({ ...state, ...payload })
  )

;