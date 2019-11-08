import { createSelector } from 'reselect';

import { selectSessionState } from '../../store/selectors';

export const selectWampSubscriptionsDictionary = createSelector(
  selectSessionState,
  session => session.wampSubscriptions
);