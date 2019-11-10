import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { deleteWampTopicSubscription, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { selectActiveWampSubscriptions } from '../../domain/wamp/wamp.selectors';
import { WampSubscriptionParams } from '../../domain/wamp/wamp.state';
import { selectCommunicationState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WampSubscriptionStatus, WampSubscriptionStatusComponent, WampSubscriptionStatusDispatchProps, WampSubscriptionStatusOwnProps, WampSubscriptionStatusStateProps } from './wamp-subscription-status.component';

const mapStateToProps: MapStateToProps<WampSubscriptionStatusStateProps, WampSubscriptionStatusOwnProps, AppState> = (state, props) => ({
  status: getWampSubscriptionStatus(props.subscription, state)
});

const mapDispatchToProps: MapDispatchToProps<WampSubscriptionStatusDispatchProps, WampSubscriptionStatusOwnProps> = (dispatch, props) => ({
  delete: () => dispatch(deleteWampTopicSubscription(props.subscription)),
  unsubscribe: () => dispatch(unsubscribeFromWampTopic.started(props.subscription))
});

export const WampSubscriptionStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WampSubscriptionStatusComponent);

function getWampSubscriptionStatus(subscription: WampSubscriptionParams, state: AppState): WampSubscriptionStatus {

  const communications = selectCommunicationState(state);
  for (const comm of communications) {
    if (subscribeToWampTopic.started.match(comm)) {
      return 'subscribing';
    } else if (unsubscribeFromWampTopic.started.match(comm)) {
      return 'unsubscribing';
    }
  }

  const active = selectActiveWampSubscriptions(state);
  if (active.some(sub => sub.id === subscription.id)) {
    return 'subscribed';
  }

  return 'unsubscribed';
}