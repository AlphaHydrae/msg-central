import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';

import { AppState } from '../../store/state';
import { preventDefault } from '../../utils/forms';
import { isBlank } from '../../utils/validations';
import { editWampSubscriptionForm, submitWampSubscriptionForm } from './wamp-subscription-form.actions';
import { WampSubscriptionForm, WampSubscriptionFormDispatchProps, WampSubscriptionFormProps, WampSubscriptionFormStateProps } from './wamp-subscription-form.component';
import { selectWampSubscriptionFormState } from './wamp-subscription-form.selectors';

const mapStateToProps: MapStateToProps<WampSubscriptionFormStateProps, {}, AppState> = state => {
  const form = selectWampSubscriptionFormState(state);
  return {
    form,
    subscribing: false,
    validations: {
      topic: {
        required: isBlank(form.topic)
      }
    }
  };
};

const mapDispatchToProps: MapDispatchToProps<WampSubscriptionFormDispatchProps, {}> = dispatch => ({
  editTopic: event => dispatch(editWampSubscriptionForm({ topic: event.currentTarget.value })),
  subscribe: values => dispatch(submitWampSubscriptionForm(values))
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
  submit: preventDefault(() => dispatchProps.subscribe(stateProps.form))
});

export const WampSubscriptionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WampSubscriptionForm);