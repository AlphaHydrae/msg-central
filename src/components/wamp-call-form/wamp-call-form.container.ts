import { isArray, isPlainObject } from 'lodash';
import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';

import { callWampProcedure } from '../../domain/wamp/wamp.actions';
import { selectActiveWampConnections, selectCurrentWampConnection } from '../../domain/wamp/wamp.selectors';
import { AppState } from '../../store/state';
import { preventDefault } from '../../utils/forms';
import { isBlank, isJson } from '../../utils/validations';
import { editWampCallForm } from './wamp-call-form.actions';
import { WampCallFormComponent, WampCallFormDispatchProps, WampCallFormProps, WampCallFormStateProps } from './wamp-call-form.component';
import { selectWampCallFormState, selectWampCallInProgress } from './wamp-call-form.selectors';
import { wampCallFormToParams } from './wamp-call-form.utils';

const mapDispatchToProps: MapDispatchToProps<WampCallFormDispatchProps, {}> = dispatch => ({
  call: params => dispatch(callWampProcedure.started(params)),
  editArgs: event => dispatch(editWampCallForm({ args: event.currentTarget.value })),
  editKwargs: event => dispatch(editWampCallForm({ kwargs: event.currentTarget.value })),
  editProcedure: event => dispatch(editWampCallForm({ procedure: event.currentTarget.value }))
});

const mapStateToProps: MapStateToProps<WampCallFormStateProps, {}, AppState> = state => {

  const connection = selectCurrentWampConnection(state);
  const form = selectWampCallFormState(state);

  return {
    form,
    calling: selectWampCallInProgress(state),
    connection: connection !== undefined && selectActiveWampConnections(state).includes(connection.id) ? connection : undefined,
    topicPrefix: connection ? connection.namespace : undefined,
    validations: {
      args: {
        valid: form.args !== '' && !isJson(form.args, isArray)
      },
      kwargs: {
        valid: form.kwargs !== '' && !isJson(form.kwargs, isPlainObject)
      },
      procedure: {
        required: isBlank(form.procedure)
      }
    }
  };
};

const mergeProps: MergeProps<
  WampCallFormStateProps,
  WampCallFormDispatchProps,
  {},
  WampCallFormProps
> = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: preventDefault(() => stateProps.connection && dispatchProps.call(
    wampCallFormToParams(stateProps.form, stateProps.connection)
  ))
});

export const WampCallFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WampCallFormComponent);