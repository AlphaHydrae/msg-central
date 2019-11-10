import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { connectToWampRouter, deleteWampConnection, disconnectFromWampRouter } from '../../domain/wamp/wamp.actions';
import { selectActiveWampConnections, selectWampSubscriptions } from '../../domain/wamp/wamp.selectors';
import { selectCommunicationState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WampConnectionStatus, WampConnectionStatusComponent, WampConnectionStatusDispatchProps, WampConnectionStatusOwnProps, WampConnectionStatusStateProps } from './wamp-connection-status.component';

const mapStateToProps: MapStateToProps<WampConnectionStatusStateProps, WampConnectionStatusOwnProps, AppState> = (state, ownProps) => {

  let status: WampConnectionStatus = 'disconnected';

  const communication = selectCommunicationState(state);
  if (communication.some(comm => connectToWampRouter.started.match(comm) && comm.payload.id === ownProps.connection.id)) {
    status = 'connecting';
  }

  const activeConnections = selectActiveWampConnections(state);
  if (activeConnections.includes(ownProps.connection.id)) {
    status = 'connected';
  }

  return {
    status,
    subscriptions: selectWampSubscriptions(state).filter(sub => sub.connectionId === ownProps.connection.id)
  };
};

const mapDispatchToProps: MapDispatchToProps<WampConnectionStatusDispatchProps, WampConnectionStatusOwnProps> = (dispatch, ownProps) => ({
  connect: () => dispatch(connectToWampRouter.started(ownProps.connection)),
  delete: () => dispatch(deleteWampConnection(ownProps.connection)),
  disconnect: () => dispatch(disconnectFromWampRouter(ownProps.connection))
});

export const WampConnectionStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WampConnectionStatusComponent);