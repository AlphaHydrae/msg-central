import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { connectToWampRouter, deleteWampConnection, disconnectFromWampRouter } from '../../domain/wamp/wamp.actions';
import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { selectActiveWampConnections, selectWampSubscriptions } from '../../domain/wamp/wamp.selectors';
import { selectCommunicationState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WampConnectionStatus, WampConnectionStatusComponent, WampConnectionStatusDispatchProps, WampConnectionStatusOwnProps, WampConnectionStatusStateProps } from './wamp-connection-status.component';

const mapStateToProps: MapStateToProps<WampConnectionStatusStateProps, WampConnectionStatusOwnProps, AppState> = (state, ownProps) => ({
  status: getWampConnectionStatus(state, ownProps.connection),
  subscriptions: selectWampSubscriptions(state).filter(sub => sub.connectionId === ownProps.connection.id)
});

const mapDispatchToProps: MapDispatchToProps<WampConnectionStatusDispatchProps, WampConnectionStatusOwnProps> = (dispatch, ownProps) => ({
  connect: () => dispatch(connectToWampRouter.started(ownProps.connection)),
  delete: () => dispatch(deleteWampConnection(ownProps.connection)),
  disconnect: () => dispatch(disconnectFromWampRouter(ownProps.connection))
});

export const WampConnectionStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WampConnectionStatusComponent);

function getWampConnectionStatus(state: AppState, connection: WampConnectionParams): WampConnectionStatus {

  const communication = selectCommunicationState(state);
  if (communication.some(comm => connectToWampRouter.started.match(comm) && comm.payload.id === connection.id)) {
    return 'connecting';
  }

  const activeConnections = selectActiveWampConnections(state);
  if (activeConnections.includes(connection.id)) {
    return 'connected';
  }

  return 'disconnected';
}