import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { selectEventsFromMostRecent } from '../../concerns/data/data.selectors';
import { deleteWampTopicSubscription, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { WampSubscription, WampSubscriptionStatus } from '../../domain/wamp/wamp.state';
import { selectCommunicationState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WampSubscriptionStatusComponent, WampSubscriptionStatusDispatchProps, WampSubscriptionStatusOwnProps, WampSubscriptionStatusStateProps } from './wamp-subscription-status.component';

const mapStateToProps: MapStateToProps<WampSubscriptionStatusStateProps, WampSubscriptionStatusOwnProps, AppState> = (state, props) => ({
  status: getWampSubscriptionStatus(props.subscription, state)
});

const mapDispatchToProps: MapDispatchToProps<WampSubscriptionStatusDispatchProps, WampSubscriptionStatusOwnProps> = (dispatch, props) => ({
  delete: () => dispatch(deleteWampTopicSubscription(props.subscription)),
  unsubscribe: () => dispatch(unsubscribeFromWampTopic.started(props.subscription))
});

export const WampSubscriptionStatusContainer = connect(mapStateToProps, mapDispatchToProps)(WampSubscriptionStatusComponent);

function getWampSubscriptionStatus(subscription: WampSubscription, state: AppState): WampSubscriptionStatus {

  const events = selectEventsFromMostRecent(state);
  const lastConnectionEventIndex = events.findIndex(event => event.type === 'wampConnectionClosed' || event.type === 'wampConnectionOpen');
  if (lastConnectionEventIndex < 0 || events[lastConnectionEventIndex].type !== 'wampConnectionOpen') {
    return 'unsubscribed';
  }

  for (const event of events.slice(0, lastConnectionEventIndex)) {
    if (event.type === 'wampTopicSubscribed' && event.subscription.id === subscription.id) {
      return 'subscribed';
    }
  }

  for (const comm of selectCommunicationState(state)) {
    if (comm.type === 'subscribingToWampTopic' && comm.subscription.id === subscription.id) {
      return 'subscribing';
    } else if (comm.type === 'unsubscribingFromWampTopic' && comm.subscription.id === subscription.id) {
      return 'unsubscribing';
    }
  }

  return 'unsubscribed';
}