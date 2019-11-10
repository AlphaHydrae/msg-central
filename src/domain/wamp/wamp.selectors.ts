import { createSelector } from 'reselect';

import { createCommunicationActionInProgressSelector, createCommunicationActionSelector } from '../../concerns/comm/comm.utils';
import { selectWampConnectionsDictionary, selectWampSubscriptionsDictionary } from '../../concerns/session/session.selectors';
import { selectDataState } from '../../store/selectors';
import { isNotUndefined } from '../../utils/validations';
import { connectToWampRouter } from './wamp.actions';

export const selectActiveWampConnections = createSelector(
  selectDataState,
  data => data.activeWampConnections
);

export const selectActiveWampSubscriptions = createSelector(
  selectDataState,
  data => data.activeWampSubscriptions
);

export const selectConnectingToWampRouter = createCommunicationActionInProgressSelector(connectToWampRouter);

export const selectConnectToWampRouterAction = createCommunicationActionSelector(connectToWampRouter);

export const selectCurrentWampConnection = createSelector(
  selectActiveWampConnections,
  selectWampConnectionsDictionary,
  (active, connections) => {
    return active.map(id => connections[id])[0];
  }
);

export const selectWampConnections = createSelector(
  selectWampConnectionsDictionary,
  connections => Object
    .values(connections)
    .filter(isNotUndefined)
    .sort((a, b) => a.id.localeCompare(b.id))
);

export const selectWampSubscriptions = createSelector(
  selectWampSubscriptionsDictionary,
  subscriptions => Object
    .values(subscriptions)
    .filter(isNotUndefined)
    .sort((a, b) => {
      const topicComparison = a.topic.localeCompare(b.topic);
      return topicComparison !== 0 ? topicComparison : a.id.localeCompare(b.id);
    })
);