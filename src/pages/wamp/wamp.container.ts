import { connect } from 'react-redux';

import { AppState } from '../../store/state';
import { WampPage, WampPageStateProps } from './wamp.component';
import { selectWampPageConnectionParams } from './wamp.selectors';

const mapStateToProps = (state: AppState) => ({
  connectionParams: selectWampPageConnectionParams(state)
});

const mapDispatchToProps = () => ({});

export const WampPageContainer = connect<WampPageStateProps, {}, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(WampPage);