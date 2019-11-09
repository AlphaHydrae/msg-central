import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { selectWampConnectionState } from '../../concerns/data/data.selectors';
import { disconnectFromWampRouter } from '../../domain/wamp/wamp.actions';
import { selectConnectToWampRouterAction, selectWampSubscriptions } from '../../domain/wamp/wamp.selectors';
import { AppState } from '../../store/state';
import { WampStatus, WampStatusDispatchProps, WampStatusStateProps } from './wamp-status.component';

export const mapStateToProps: MapStateToProps<WampStatusStateProps, {}, AppState> = state => ({
  connection: selectWampConnectionState(state),
  openingConnection: selectConnectToWampRouterAction(state),
  subscriptions: selectWampSubscriptions(state)
});

export const mapDispatchToProps: MapDispatchToProps<WampStatusDispatchProps, {}> = dispatch => ({
  disconnect: () => dispatch(disconnectFromWampRouter())
});

export const WampStatusContainer = connect(mapStateToProps, mapDispatchToProps)(WampStatus);