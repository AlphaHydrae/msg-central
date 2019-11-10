import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';

import { connectToWsServer, disconnectFromWsServer } from '../../domain/ws/ws.actions';
import { selectConnectingToWsServer } from '../../domain/ws/ws.selectors';
import { AppState } from '../../store/state';
import { preventDefault } from '../../utils/forms';
import { isBlank, isUrlString } from '../../utils/validations';
import { editWsConnectionForm } from './ws-connection-form.actions';
import { WsConnectionFormComponent, WsConnectionFormDispatchProps, WsConnectionFormProps, WsConnectionFormStateProps } from './ws-connection-form.component';
import { selectWsConnectionFormState } from './ws-connection-form.selectors';
import { wsConnectionFormToParams } from './ws-connection-form.utils';

const mapStateToProps: MapStateToProps<WsConnectionFormStateProps, {}, AppState> = state => {
  const connectionParams = selectWsConnectionFormState(state);
  return {
    connecting: selectConnectingToWsServer(state),
    form: connectionParams,
    validations: {
      serverUrl: {
        required: isBlank(connectionParams.serverUrl),
        valid: !isUrlString(connectionParams.serverUrl, [ 'ws:', 'wss:' ])
      }
    }
  };
};

const mapDispatchToProps: MapDispatchToProps<WsConnectionFormDispatchProps, {}> = dispatch => ({
  cancel: params => dispatch(disconnectFromWsServer(params)),
  connect: params => dispatch(connectToWsServer.started(params)),
  editServerUrl: event => dispatch(editWsConnectionForm({ serverUrl: event.currentTarget.value }))
});

const mergeProps: MergeProps<
  WsConnectionFormStateProps,
  WsConnectionFormDispatchProps,
  {},
  WsConnectionFormProps
> = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onCancelClicked: () => stateProps.connecting && dispatchProps.cancel(stateProps.connecting.payload),
  onSubmit: preventDefault(() => dispatchProps.connect(wsConnectionFormToParams(stateProps.form)))
});

export const WsConnectionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WsConnectionFormComponent);