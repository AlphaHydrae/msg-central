import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { connectToWsServer, deleteWsConnection, disconnectFromWsServer } from '../../domain/ws/ws.actions';
import { selectActiveWsConnections } from '../../domain/ws/ws.selectors';
import { WsConnectionParams } from '../../domain/ws/ws.state';
import { selectCommunicationState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WsConnectionStatus, WsConnectionStatusComponent, WsConnectionStatusDispatchProps, WsConnectionStatusOwnProps, WsConnectionStatusStateProps } from './ws-connection-status.component';

const mapStateToProps: MapStateToProps<WsConnectionStatusStateProps, WsConnectionStatusOwnProps, AppState> = (state, ownProps) => ({
  status: getWsConnectionStatus(state, ownProps.connection)
});

const mapDispatchToProps: MapDispatchToProps<WsConnectionStatusDispatchProps, WsConnectionStatusOwnProps> = (dispatch, ownProps) => ({
  connect: () => dispatch(connectToWsServer.started(ownProps.connection)),
  delete: () => dispatch(deleteWsConnection(ownProps.connection)),
  disconnect: () => dispatch(disconnectFromWsServer(ownProps.connection))
});

export const WsConnectionStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WsConnectionStatusComponent);

function getWsConnectionStatus(state: AppState, connection: WsConnectionParams): WsConnectionStatus {

  const communication = selectCommunicationState(state);
  if (communication.some(comm => connectToWsServer.started.match(comm) && comm.payload.id === connection.id)) {
    return 'connecting';
  }

  const activeConnections = selectActiveWsConnections(state);
  if (activeConnections.includes(connection.id)) {
    return 'connected';
  }

  return 'disconnected';
}