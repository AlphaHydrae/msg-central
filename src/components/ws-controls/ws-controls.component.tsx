import React, { Fragment } from 'react';

import { WsConnectionFormContainer } from '../ws-connection-form/ws-connection-form.container';
import { WsMessageFormContainer } from '../ws-message-form/ws-message-form.container';

export interface WsControlsStateProps {
  readonly connectionControlsEnabled: boolean;
}

export function WsControlsComponent(props: WsControlsStateProps) {
  return (
    <Fragment>
      {!props.connectionControlsEnabled && <WsConnectionFormContainer />}
      {props.connectionControlsEnabled && (
        <Fragment>
          <WsMessageFormContainer />
        </Fragment>
      )}
    </Fragment>
  );
}