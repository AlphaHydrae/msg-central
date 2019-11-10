import { createSelector } from 'reselect';

import { selectSessionState } from '../../store/selectors';

export const selectWampConnectionsDictionary = createSelector(
  selectSessionState,
  session => session.wampConnections
);

export const selectWampSubscriptionsDictionary = createSelector(
  selectSessionState,
  session => session.wampSubscriptions
);