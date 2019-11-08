import { reject } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { connectToWampRouter, handleWampConnectionClosed, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { initialCommunicationState } from './comm.state';

export const communicationReducer = reducerWithInitialState(initialCommunicationState)

  .cases(
    [ connectToWampRouter.done, connectToWampRouter.failed ],
    (state, payload) => reject(state, comm => comm.type === 'openingWampConnection' && comm.params.routerUrl === payload.params.routerUrl)
  )

  .case(connectToWampRouter.started, (state, payload) => [
    ...state,
    {
      type: 'openingWampConnection',
      params: payload
    }
  ])

  .case(
    handleWampConnectionClosed,
    state => reject(state, comm => comm.type === 'openingWampConnection' || comm.type === 'subscribingToWampTopic' || comm.type === 'unsubscribingFromWampTopic')
  )

  .cases(
    [ subscribeToWampTopic.done, subscribeToWampTopic.failed ],
    (state, payload) => reject(state, comm => comm.type === 'subscribingToWampTopic' && comm.subscription.id === payload.params.id)
  )

  .case(subscribeToWampTopic.started, (state, payload) => [
    ...state,
    {
      type: 'subscribingToWampTopic',
      subscription: payload
    }
  ])

  .cases(
    [ unsubscribeFromWampTopic.done, unsubscribeFromWampTopic.failed ],
    (state, payload) => reject(state, comm => comm.type === 'unsubscribingFromWampTopic' && comm.subscription.id === payload.params.id)
  )

  .case(unsubscribeFromWampTopic.started, (state, payload) => [
    ...state,
    {
      type: 'unsubscribingFromWampTopic',
      subscription: payload
    }
  ])

;