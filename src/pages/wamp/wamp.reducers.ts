import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { initialWampPageState } from './wamp.state';

export const wampPageReducer = reducerWithInitialState(initialWampPageState);