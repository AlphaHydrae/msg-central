import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';

import { disconnectFromWampRouter } from '../../domain/wamp/wamp.actions';
import { selectConnectToWampRouterAction, selectWampSubscriptions } from '../../domain/wamp/wamp.selectors';
import { selectDataState, selectSessionState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WampStatus, WampStatusDispatchProps, WampStatusProps, WampStatusStateProps } from './wamp-status.component';

export const mapStateToProps: MapStateToProps<WampStatusStateProps, {}, AppState> = state => {
  // FIXME: write selector
  const connections = selectSessionState(state).wampConnections;
  const activeConnections = selectDataState(state).activeWampConnections.map(id => connections[id]);
  return {
    connection: activeConnections[0],
    openingConnection: selectConnectToWampRouterAction(state),
    subscriptions: selectWampSubscriptions(state)
  };
};

export const mapDispatchToProps: MapDispatchToProps<WampStatusDispatchProps, {}> = dispatch => ({
  disconnect: connection => dispatch(disconnectFromWampRouter(connection))
});

export const mergeProps: MergeProps<
  WampStatusStateProps,
  WampStatusDispatchProps,
  {},
  WampStatusProps
> = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onDisconnectClicked: () => stateProps.connection && dispatchProps.disconnect(stateProps.connection)
});

export const WampStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WampStatus);