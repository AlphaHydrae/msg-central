import { constant } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { subscribeToWampTopic } from '../../domain/wamp/wamp.actions';
import { editWampSubscriptionForm } from './wamp-subscription-form.actions';
import { initialWampSubscriptionFormState } from './wamp-subscription-form.state';

export const wampSubscriptionFormReducer = reducerWithInitialState(initialWampSubscriptionFormState)
  .case(editWampSubscriptionForm, (state, payload) => ({ ...state, ...payload }))
  .case(subscribeToWampTopic.done, constant(initialWampSubscriptionFormState))
;