import { createSelector } from 'reselect';

import { createCommunicationActionInProgressSelector } from '../../concerns/comm/comm.utils';
import { subscribeToWampTopic } from '../../domain/wamp/wamp.actions';
import { selectControlState } from '../../store/selectors';

export const selectWampSubscriptionFormState = createSelector(
  selectControlState,
  control => control.wampSubscriptionForm
);

export const selectWampSubscriptionInProgress = createCommunicationActionInProgressSelector(subscribeToWampTopic);