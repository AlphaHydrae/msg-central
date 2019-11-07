import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import { selectWampConnectionState } from '../../concerns/data/data.selectors';
import { AppState } from '../../store/state';
import { disconnectFromWampRouter } from './wamp-page.actions';
import { WampPage, WampPageDispatchProps, WampPageStateProps } from './wamp-page.component';

const mapStateToProps: MapStateToProps<WampPageStateProps, {}, AppState> = (state: AppState) => {
  return {
    connection: selectWampConnectionState(state)
  };
};

const mapDispatchToProps: MapDispatchToProps<WampPageDispatchProps, {}> = (dispatch: Dispatch) => ({
  disconnect: () => dispatch(disconnectFromWampRouter())
});

export const WampPageContainer = connect<WampPageStateProps, WampPageDispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(WampPage);