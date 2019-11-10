import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';
import uuid from 'uuid/v4';

import { subscribeToWampTopic } from '../../domain/wamp/wamp.actions';
import { selectActiveWampConnections, selectCurrentWampConnection } from '../../domain/wamp/wamp.selectors';
import { AppState } from '../../store/state';
import { preventDefault } from '../../utils/forms';
import { isBlank } from '../../utils/validations';
import { editWampSubscriptionForm } from './wamp-subscription-form.actions';
import { WampSubscriptionForm, WampSubscriptionFormDispatchProps, WampSubscriptionFormProps, WampSubscriptionFormStateProps } from './wamp-subscription-form.component';
import { selectWampSubscriptionFormState, selectWampSubscriptionInProgress } from './wamp-subscription-form.selectors';

const mapStateToProps: MapStateToProps<WampSubscriptionFormStateProps, {}, AppState> = state => {

  const connection = selectCurrentWampConnection(state);
  const form = selectWampSubscriptionFormState(state);

  return {
    form,
    connection: connection !== undefined && selectActiveWampConnections(state).includes(connection.id) ? connection : undefined,
    subscribing: selectWampSubscriptionInProgress(state),
    topicPrefix: connection ? connection.namespace : undefined,
    validations: {
      topic: {
        required: isBlank(form.topic)
      }
    }
  };
};

const mapDispatchToProps: MapDispatchToProps<WampSubscriptionFormDispatchProps, {}> = dispatch => ({
  editTopic: event => dispatch(editWampSubscriptionForm({ topic: event.currentTarget.value })),
  subscribe: params => dispatch(subscribeToWampTopic.started(params))
});

const mergeProps: MergeProps<
  WampSubscriptionFormStateProps,
  WampSubscriptionFormDispatchProps,
  {},
  WampSubscriptionFormProps
> = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  submit: preventDefault(() => stateProps.connection && dispatchProps.subscribe({
    connectionId: stateProps.connection.id,
    id: uuid(),
    topic: `${stateProps.topicPrefix || ''}${stateProps.form.topic}`
  }))
});

export const WampSubscriptionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WampSubscriptionForm);