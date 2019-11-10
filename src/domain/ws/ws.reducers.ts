import { omit } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { initialSessionState } from '../../concerns/session/session.state';
import { loadSavedState } from '../../store/storage';
import { connectToWsServer, deleteWsConnection } from './ws.actions';

export const wsConnectionsReducer = reducerWithInitialState(initialSessionState.wsConnections)

  .case(
    connectToWsServer.done,
    (state, payload) => ({ ...state, [payload.params.id]: payload.params })
  )

  .case(
    deleteWsConnection,
    (state, payload) => omit(state, payload.id)
  )

  .case(
    loadSavedState,
    (_, payload) => payload.session.wsConnections
  )

;