import { connect, MapStateToProps } from 'react-redux';

import { AppState } from '../../store/state';
import { WampControls, WampControlsStateProps } from './wamp-controls.component';
import { selectWampConnectionControlsEnabled } from './wamp-controls.selectors';

export const mapStateToProps: MapStateToProps<WampControlsStateProps, {}, AppState> = state => ({
  connectionControlsEnabled: selectWampConnectionControlsEnabled(state)
});

export const mapDispatchToProps = () => ({});

export const WampControlsContainer = connect(mapStateToProps, mapDispatchToProps)(WampControls);