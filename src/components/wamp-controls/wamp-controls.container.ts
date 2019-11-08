import { connect, MapStateToProps } from 'react-redux';

import { selectWampConnectionState } from '../../concerns/data/data.selectors';
import { AppState } from '../../store/state';
import { WampControls, WampControlsStateProps } from './wamp-controls.component';

export const mapStateToProps: MapStateToProps<WampControlsStateProps, {}, AppState> = state => ({
  connected: selectWampConnectionState(state) !== undefined
});

export const mapDispatchToProps = () => ({});

export const WampControlsContainer = connect(mapStateToProps, mapDispatchToProps)(WampControls);