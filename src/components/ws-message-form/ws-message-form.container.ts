import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';

import { sendWsMessage } from '../../domain/ws/ws.actions';
import { selectActiveWsConnections, selectCurrentWsConnection } from '../../domain/ws/ws.selectors';
import { AppState } from '../../store/state';
import { preventDefault } from '../../utils/forms';
import { isBlank, isJson, isPresent } from '../../utils/validations';
import { editWsMessageForm } from './ws-message-form.actions';
import { WsMessageFormComponent, WsMessageFormDispatchProps, WsMessageFormProps, WsMessageFormStateProps } from './ws-message-form.component';
import { selectWsMessageFormState } from './ws-message-form.selectors';
import { wsMessageFormToParams } from './ws-message-form.utils';

const mapDispatchToProps: MapDispatchToProps<WsMessageFormDispatchProps, {}> = dispatch => ({
  editData: event => dispatch(editWsMessageForm({ data: event.currentTarget.value })),
  editJson: event => dispatch(editWsMessageForm({ json: event.currentTarget.checked })),
  send: params => dispatch(sendWsMessage(params))
});

const mapStateToProps: MapStateToProps<WsMessageFormStateProps, {}, AppState> = state => {

  const connection = selectCurrentWsConnection(state);
  const form = selectWsMessageFormState(state);

  return {
    form,
    connection: connection !== undefined && selectActiveWsConnections(state).includes(connection.id) ? connection : undefined,
    validations: {
      data: {
        json: isPresent(form.data) && form.json && !isJson(form.data),
        required: isBlank(form.data)
      }
    }
  };
};

const mergeProps: MergeProps<
  WsMessageFormStateProps,
  WsMessageFormDispatchProps,
  {},
  WsMessageFormProps
> = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: preventDefault(() => stateProps.connection && dispatchProps.send(
    wsMessageFormToParams(stateProps.form, stateProps.connection)
  ))
});

export const WsMessageFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WsMessageFormComponent);