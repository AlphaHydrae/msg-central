import React, { Fragment } from 'react';

import { WampCallFormContainer } from '../wamp-call-form/wamp-call-form.container';
import { WampConnectionFormContainer } from '../wamp-connection-form/wamp-connection-form.container';
import { WampSubscriptionFormContainer } from '../wamp-subscription-form/wamp-subscription-form.container';

export interface WampControlsStateProps {
  readonly connectionControlsEnabled: boolean;
}

export function WampControls(props: WampControlsStateProps) {
  return (
    <Fragment>
      {!props.connectionControlsEnabled && <WampConnectionFormContainer />}
      {props.connectionControlsEnabled && (
        <Fragment>
          <WampSubscriptionFormContainer />
          <WampCallFormContainer />
        </Fragment>
      )}
    </Fragment>
  );
}