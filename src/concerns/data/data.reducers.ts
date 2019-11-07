import { combineReducers } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { connectToWampRouter } from '../../components/wamp-connection-form/wamp-connection-form.actions';
import { handleWampConnectionClosed } from '../../domain/wamp/wamp.actions';
import { DataState, initialDataState } from './data.state';

const wampConnectionReducer = reducerWithInitialState(initialDataState.wampConnection)

  .case(connectToWampRouter.started, (_, payload) => ({
    connected: false,
    params: payload
  }))

  .case(connectToWampRouter.done, (_, payload) => ({
    connected: true,
    params: payload.params
  }))

  .case(handleWampConnectionClosed, state => state ? ({
    ...state,
    connected: false
  }) : state)

;

export const dataReducer = combineReducers<DataState>({
  wampConnection: wampConnectionReducer
});