import { constant } from 'lodash';
import { combineReducers } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { connectToWampRouter, handleWampConnectionClosed, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { createWampEvent } from '../../domain/wamp/wamp.utils';
import { DataState, initialDataState } from './data.state';

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

const eventsReducer = reducerWithInitialState(initialDataState.events)

  .case(connectToWampRouter.done, (state, payload) => [
    ...state,
    createWampEvent({
      type: 'wampConnectionOpen',
      params: payload.params
    })
  ])

  .case(connectToWampRouter.failed, (state, payload) => [
    ...state,
    createWampEvent({
      type: 'wampConnectionClosed',
      details: payload.error.details,
      params: payload.params,
      reason: payload.error.reason
    })
  ])

  .case(handleWampConnectionClosed, (state, payload) => [
    ...state,
    createWampEvent({
      type: 'wampConnectionClosed',
      ...payload
    })
  ])

  .case(subscribeToWampTopic.done, (state, payload) => [
    ...state,
    createWampEvent({
      type: 'wampTopicSubscribed',
      subscription: payload.params
    })
  ])

  .case(unsubscribeFromWampTopic.done, (state, payload) => [
    ...state,
    createWampEvent({
      type: 'wampTopicUnsubscribed',
      subscription: payload.params
    })
  ])

;

export const dataReducer = combineReducers<DataState>({
  activeWampConnections: activeWampConnectionsReducer,
  events: eventsReducer
});