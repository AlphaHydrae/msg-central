import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

import { WampConnectionFormContainer } from '../../components/wamp-connection-form/wamp-connection-form.container';
import { WampConnectionState } from '../../concerns/data/data.state';

export interface WampPageDispatchProps {
  readonly disconnect: () => void;
}

export interface WampPageStateProps {
  readonly connection: WampConnectionState | null;
}

export function WampPage(props: WampPageDispatchProps & WampPageStateProps) {
  return (
    <Row>
      <Col>
        <ConnectionCard />
      </Col>
      <Col>
        <StatusCard {...props} />
        <EventLogCard />
      </Col>
    </Row>
  );
}

function EventLogCard() {
  return (
    <Card>
      <Card.Header>Event Log</Card.Header>
      <Card.Body>
        <p className='lead text-center text-muted'><em>Nothing is happening</em></p>
      </Card.Body>
    </Card>
  );
}

function StatusCard(props: WampPageDispatchProps & WampPageStateProps) {

  let connectionListItemVariant: 'info' | 'success' = 'info';
  if (props.connection && props.connection.connected) {
    connectionListItemVariant = 'success';
  }

  return (
    <Card className='mb-3'>
      <Card.Header>Status</Card.Header>
      {!props.connection && (
        <Card.Body>
          <p className='lead text-center text-muted'><em>No connections</em></p>
        </Card.Body>
      )}
      {props.connection && (
        <ListGroup variant='flush'>
          <ListGroup.Item className='d-flex align-items-center justify-content-between' variant={connectionListItemVariant}>
            <span>
              Connected to
              {' '}
              <strong>{props.connection.params.routerUrl}</strong>
              {' '}
              on realm
              {' '}
              <strong>{props.connection.params.realm}</strong>
            </span>
            <Button className='ml-3 float-right' variant='warning' type='button' onClick={props.disconnect}>Disconnect</Button>
          </ListGroup.Item>
        </ListGroup>
      )}
    </Card>
  );
}

function ConnectionCard() {
  return (
    <Card>
      <Card.Header>Connection</Card.Header>
      <Card.Body>
        <WampConnectionFormContainer />
      </Card.Body>
    </Card>
  );
}