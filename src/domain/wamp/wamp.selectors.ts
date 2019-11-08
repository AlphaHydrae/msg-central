import { createSelector } from 'reselect';

import { selectWampSubscriptionsDictionary } from '../../concerns/session/session.selectors';
import { selectCommunicationState } from '../../store/selectors';

export const selectOpeningWampConnection = createSelector(
  selectCommunicationState,
  state => {
    for (const comm of state) {
      if (comm.type === 'openingWampConnection') {
        return comm;
      }
    }

    return;
  }
);

export const selectWampSubscriptions = createSelector(
  selectWampSubscriptionsDictionary,
  wampSubscriptions => Object.values(wampSubscriptions).sort((a, b) => a.topic.localeCompare(b.topic))
);