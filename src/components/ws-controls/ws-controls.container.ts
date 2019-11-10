import { connect, MapStateToProps } from 'react-redux';

import { AppState } from '../../store/state';
import { WsControlsComponent, WsControlsStateProps } from './ws-controls.component';
import { selectWsConnectionControlsEnabled } from './ws-controls.selectors';

export const mapStateToProps: MapStateToProps<WsControlsStateProps, {}, AppState> = state => ({
  connectionControlsEnabled: selectWsConnectionControlsEnabled(state)
});

export const mapDispatchToProps = () => ({});

export const WsControlsContainer = connect(mapStateToProps, mapDispatchToProps)(WsControlsComponent);