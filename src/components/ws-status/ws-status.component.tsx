import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { WsConnectionParams } from '../../domain/ws/ws.state';
import { WsConnectionStatusContainer } from '../ws-connection-status/ws-connection-status.container';

export interface WsStatusStateProps {
  readonly connections: WsConnectionParams[];
}

export function WsStatusComponent(props: WsStatusStateProps) {
  return (
    <Card className='mb-3'>
      <Card.Header>Status</Card.Header>
      <ListGroup variant='flush'>
        {props.connections.map(connection => <WsConnectionStatusContainer key={connection.id} connection={connection} />)}
        {!props.connections.length && (
          <ListGroup.Item variant='secondary'>
            Not connected to a WebSocket server
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}