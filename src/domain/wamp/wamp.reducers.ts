import { omit } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { loadSavedState } from '../../store/storage';
import { Dictionary } from '../../utils/types';
import { deleteWampTopicSubscription, subscribeToWampTopic, unsubscribeFromWampTopic } from './wamp.actions';
import { WampSubscription } from './wamp.state';

export const wampSubscriptionsReducer = reducerWithInitialState<Dictionary<WampSubscription>>({})

  .case(deleteWampTopicSubscription, (state, payload) => omit(state, payload.id))

  .case(loadSavedState, (_, payload) => payload.session.wampSubscriptions)

  .case(subscribeToWampTopic.done, (state, payload) => ({
    ...state,
    [payload.params.id]: payload.params
  }))

  .case(unsubscribeFromWampTopic.done, (state, payload) => omit(state, payload.params.id))

;