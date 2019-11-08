import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { AppState } from '../../store/state';
import { submitWampSubscriptionForm } from './wamp-subscription-form.actions';
import { WampSubscriptionForm, WampSubscriptionFormDispatchProps, WampSubscriptionFormStateProps } from './wamp-subscription-form.component';

const mapStateToProps: MapStateToProps<WampSubscriptionFormStateProps, {}, AppState> = () => ({
  form: {
    topic: ''
  },
  subscribing: false
});

const mapDispatchToProps: MapDispatchToProps<WampSubscriptionFormDispatchProps, {}> = dispatch => ({
  editTopic: () => undefined,
  subscribe: values => dispatch(submitWampSubscriptionForm(values))
});

export const WampSubscriptionFormContainer = connect(mapStateToProps, mapDispatchToProps)(WampSubscriptionForm);