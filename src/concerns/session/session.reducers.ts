import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { initialSessionState } from './session.state';

export const sessionReducer = reducerWithInitialState(initialSessionState);