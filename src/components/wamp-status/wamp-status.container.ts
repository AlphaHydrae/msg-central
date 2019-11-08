import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { selectEventsFromMostRecent, selectWampConnectionState } from '../../concerns/data/data.selectors';
import { deleteWampTopicSubscription, disconnectFromWampRouter, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { selectOpeningWampConnection, selectWampSubscriptions } from '../../domain/wamp/wamp.selectors';
import { selectCommunicationState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WampStatus, WampStatusDispatchProps, WampStatusStateProps, WampSubscriptionStatus } from './wamp-status.component';

export const mapStateToProps: MapStateToProps<WampStatusStateProps, {}, AppState> = state => {

  const connectedSubscriptionIds: string[] = [];
  const ongoingSubscriptionIds: string[] = [];
  const unsubscriptionIds: string[] = [];

  const events = selectEventsFromMostRecent(state);
  const lastConnectionEventIndex = events.findIndex(event => event.type === 'wampConnectionClosed' || event.type === 'wampConnectionOpen');
  if (lastConnectionEventIndex >= 0 && events[lastConnectionEventIndex].type === 'wampConnectionOpen') {
    for (const event of events.slice(0, lastConnectionEventIndex)) {
      if (event.type === 'wampTopicSubscribed') {
        connectedSubscriptionIds.push(event.subscription.id);
      }
    }

    for (const comm of selectCommunicationState(state)) {
      if (comm.type === 'subscribingToWampTopic') {
        ongoingSubscriptionIds.push(comm.subscription.id);
      } else if (comm.type === 'unsubscribingFromWampTopic') {
        unsubscriptionIds.push(comm.subscription.id);
      }
    }
  }

  return {
    connection: selectWampConnectionState(state),
    openingConnection: selectOpeningWampConnection(state),
    subscriptions: selectWampSubscriptions(state).map(sub => {

      let status: WampSubscriptionStatus = 'unsubscribed';
      if (connectedSubscriptionIds.includes(sub.id)) {
        status = 'subscribed';
      } else if (ongoingSubscriptionIds.includes(sub.id)) {
        status = 'subscribing';
      } else if (unsubscriptionIds.includes(sub.id)) {
        status = 'unsubscribing';
      }

      return {
        ...sub,
        status
      };
    })
  };
};

export const mapDispatchToProps: MapDispatchToProps<WampStatusDispatchProps, {}> = dispatch => ({
  delete: subscription => dispatch(deleteWampTopicSubscription(subscription)),
  disconnect: () => dispatch(disconnectFromWampRouter()),
  unsubscribe: subscription => dispatch(unsubscribeFromWampTopic.started(subscription))
});

export const WampStatusContainer = connect(mapStateToProps, mapDispatchToProps)(WampStatus);