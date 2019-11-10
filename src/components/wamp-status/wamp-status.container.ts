import { connect, MapStateToProps } from 'react-redux';

import { selectWampConnections } from '../../domain/wamp/wamp.selectors';
import { AppState } from '../../store/state';
import { WampStatusComponent, WampStatusStateProps } from './wamp-status.component';

export const mapStateToProps: MapStateToProps<WampStatusStateProps, {}, AppState> = state => {
  return {
    connections: selectWampConnections(state)
  };
};

export const mapDispatchToProps = () => ({});

export const WampStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WampStatusComponent);