import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampConnectionStatusContainer } from '../wamp-connection-status/wamp-connection-status.container';

export interface WampStatusStateProps {
  readonly connections: WampConnectionParams[];
}

export function WampStatusComponent(props: WampStatusStateProps) {
  return (
    <Card className='mb-3'>
      <Card.Header>Status</Card.Header>
      <ListGroup variant='flush'>
        {props.connections.map(connection => <WampConnectionStatusContainer key={connection.id} connection={connection} />)}
        {!props.connections.length && (
          <ListGroup.Item variant='secondary'>
            Not connected to a WAMP router
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}