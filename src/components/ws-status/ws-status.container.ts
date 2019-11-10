import { connect, MapStateToProps } from 'react-redux';

import { selectWsConnections } from '../../domain/ws/ws.selectors';
import { AppState } from '../../store/state';
import { WsStatusComponent, WsStatusStateProps } from './ws-status.component';

export const mapStateToProps: MapStateToProps<WsStatusStateProps, {}, AppState> = state => {
  return {
    connections: selectWsConnections(state)
  };
};

export const mapDispatchToProps = () => ({});

export const WsStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WsStatusComponent);