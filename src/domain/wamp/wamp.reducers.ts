import { omit } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { loadSavedState } from '../../store/storage';
import { Dictionary } from '../../utils/types';
import { connectToWampRouter, deleteWampTopicSubscription, subscribeToWampTopic, unsubscribeFromWampTopic } from './wamp.actions';
import { WampConnectionParams } from './wamp.connection-params';
import { WampSubscriptionParams } from './wamp.state';
import { getNewWampSubscriptionKey, getWampSubscriptionKey } from './wamp.utils';

export const wampConnectionsReducer = reducerWithInitialState<Dictionary<WampConnectionParams>>({})

  .case(
    connectToWampRouter.done,
    (state, payload) => ({ ...state, [payload.params.id]: payload.params })
  )

  .case(loadSavedState, (_, payload) => payload.session.wampConnections)

;

export const wampSubscriptionsReducer = reducerWithInitialState<Dictionary<WampSubscriptionParams>>({})

  .case(
    deleteWampTopicSubscription,
    (state, payload) => omit(state, getWampSubscriptionKey(payload))
  )

  .case(
    loadSavedState,
    (_, payload) => payload.session.wampSubscriptions
  )

  .case(subscribeToWampTopic.done, (state, payload) => ({
    ...state,
    [getNewWampSubscriptionKey(payload)]: payload.params
  }))

  .case(
    unsubscribeFromWampTopic.done,
    (state, payload) => omit(state, getWampSubscriptionKey(payload.params))
  )

;