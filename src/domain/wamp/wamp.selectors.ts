import { createSelector } from 'reselect';

import { createCommunicationActionInProgressSelector, createCommunicationActionSelector } from '../../concerns/comm/comm.utils';
import { selectWampSubscriptionsDictionary } from '../../concerns/session/session.selectors';
import { connectToWampRouter } from './wamp.actions';

export const selectConnectingToWampRouter = createCommunicationActionInProgressSelector(connectToWampRouter);

export const selectConnectToWampRouterAction = createCommunicationActionSelector(connectToWampRouter);

export const selectWampSubscriptions = createSelector(
  selectWampSubscriptionsDictionary,
  wampSubscriptions => Object.values(wampSubscriptions).sort((a, b) => a.topic.localeCompare(b.topic))
);