import { connect } from 'react-redux';

import { WsPageComponent } from './ws-page.component';

export const WsPageContainer = connect()(WsPageComponent);