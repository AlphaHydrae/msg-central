import React, { Fragment } from 'react';

import { Card } from 'react-bootstrap';
import { WampConnectionFormContainer } from '../wamp-connection-form/wamp-connection-form.container';
import { WampSubscriptionFormContainer } from '../wamp-subscription-form/wamp-subscription-form.container';

export interface WampControlsStateProps {
  readonly connected: boolean;
}

export function WampControls(props: WampControlsStateProps) {
  return (
    <Fragment>
      {!props.connected && <WampConnectionFormContainer />}
      {props.connected && (
        <Fragment>
          <WampSubscriptionFormContainer />
          <Card className='mt-3'>
            <Card.Header>Call a WAMP procedure</Card.Header>
            <Card.Body>Hello</Card.Body>
          </Card>
        </Fragment>
      )}
    </Fragment>
  );
}