import { omit, omitBy } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { loadSavedState } from '../../store/storage';
import { Dictionary } from '../../utils/types';
import { connectToWampRouter, deleteWampConnection, deleteWampTopicSubscription, subscribeToWampTopic, unsubscribeFromWampTopic } from './wamp.actions';
import { WampConnectionParams } from './wamp.connection-params';
import { WampSubscriptionParams } from './wamp.state';

export const wampConnectionsReducer = reducerWithInitialState<Dictionary<WampConnectionParams>>({})

  .case(
    connectToWampRouter.done,
    (state, payload) => ({ ...state, [payload.params.id]: payload.params })
  )

  .case(
    deleteWampConnection,
    (state, payload) => omit(state, payload.id)
  )

  .case(loadSavedState, (_, payload) => payload.session.wampConnections)

;

export const wampSubscriptionsReducer = reducerWithInitialState<Dictionary<WampSubscriptionParams>>({})

  .case(
    deleteWampConnection,
    (state, payload) => omitBy(state, sub => sub && sub.connectionId === payload.id)
  )

  .case(
    deleteWampTopicSubscription,
    (state, payload) => omit(state, payload.id)
  )

  .case(
    loadSavedState,
    (_, payload) => payload.session.wampSubscriptions
  )

  .case(
    subscribeToWampTopic.done,
    (state, payload) => ({ ...state, [payload.params.id]: payload.params })
  )

  .case(
    unsubscribeFromWampTopic.done,
    (state, payload) => omit(state, payload.params.id)
  )

;