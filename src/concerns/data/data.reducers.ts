import { constant, reject } from 'lodash';
import { combineReducers, Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import uuid from 'uuid/v4';

import { connectToWampRouter, handleWampConnectionClosed, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { connectToWsServer, handleWsConnectionClosed } from '../../domain/ws/ws.actions';
import { eventActionTypes } from './data.actions';
import { AppEvent, DataState, initialDataState } from './data.state';

const activeWampConnectionsReducer = reducerWithInitialState(initialDataState.activeWampConnections)

  .case(
    connectToWampRouter.done,
    (state, payload) => [ ...state, payload.params.id ]
  )

  .cases(
    [ connectToWampRouter.failed, handleWampConnectionClosed ],
    constant([])
  )

;

const activeWampSubscriptionsReducer = reducerWithInitialState(initialDataState.activeWampSubscriptions)

  .case(
    handleWampConnectionClosed,
    (state, payload) => reject(state, sub => sub.connectionId === payload.params.id)
  )

  .case(
    subscribeToWampTopic.done,
    (state, payload) => [ ...state, { connectionId: payload.params.connectionId, id: payload.params.id } ]
  )

  .case(
    unsubscribeFromWampTopic.done,
    (state, payload) => reject(state, sub => sub.id === payload.params.id)
  )

;

const activeWsConnectionsReducer = reducerWithInitialState(initialDataState.activeWsConnections)

  .case(
    connectToWsServer.done,
    (state, payload) => [ ...state, payload.params.id ]
  )

  .case(
    handleWsConnectionClosed,
    constant([])
  )

;

const eventsReducer: Reducer<Array<AppEvent<any>>> =
  (state = initialDataState.events, action) => eventActionTypes.includes(action.type) ?
    [
      ...state,
      {
        action,
        id: uuid(),
        time: new Date().toISOString()
      }
    ] :
    state;

export const dataReducer = combineReducers<DataState>({
  activeWampConnections: activeWampConnectionsReducer,
  activeWampSubscriptions: activeWampSubscriptionsReducer,
  activeWsConnections: activeWsConnectionsReducer,
  events: eventsReducer
});