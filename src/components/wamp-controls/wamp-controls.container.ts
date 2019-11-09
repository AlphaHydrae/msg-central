import { connect, MapStateToProps } from 'react-redux';

import { selectDataState } from '../../store/selectors';
import { AppState } from '../../store/state';
import { WampControls, WampControlsStateProps } from './wamp-controls.component';

export const mapStateToProps: MapStateToProps<WampControlsStateProps, {}, AppState> = state => ({
  // FIXME: write selector
  connected: selectDataState(state).activeWampConnections.length >= 1
});

export const mapDispatchToProps = () => ({});

export const WampControlsContainer = connect(mapStateToProps, mapDispatchToProps)(WampControls);