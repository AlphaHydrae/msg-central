import { connect, MapStateToProps } from 'react-redux';

import { AppState } from '../../store/state';
import { HomePageComponent, HomePageProps } from './home-page.component';
import { selectWampConnectionOpen, selectWsConnectionOpen } from './home-page.selectors';

const mapStateToProps: MapStateToProps<HomePageProps, {}, AppState> = state => {
  return {
    wampConnectionOpen: selectWampConnectionOpen(state),
    wsConnectionOpen: selectWsConnectionOpen(state)
  };
};

const mapDispatchToProps = () => ({});

export const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent);