import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import { WampConnectionParams } from '../../domain/wamp-connection-params';

export interface WampPageStateProps {
  readonly connectionParams: WampConnectionParams;
}

export function WampPage(props: WampPageStateProps) {

  const params = props.connectionParams;

  return (
    <Row>
      <Col>
      <Card>
        <Card.Header>Connection</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId='url'>
              <Form.Label>Router URL</Form.Label>
              <Form.Control type='text' placeholder='wss://wamp.example.com/ws' value={params.routerUrl} readOnly={true} />
            </Form.Group>

            <Form.Group controlId='realm'>
              <Form.Label>Realm</Form.Label>
              <Form.Control type='text' placeholder='realm1' value={params.realm} readOnly={true} />
            </Form.Group>

            <Form.Group controlId='namespace'>
              <Form.Label>Namespace</Form.Label>
              <Form.Control type='text' placeholder='com.example' value={params.namespace || ''} readOnly={true} />
              <Form.Text>
                Optional prefix for all procedure and topic names.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='auth-type'>
              <Form.Label>Authentication</Form.Label>
              <Form.Control as='select' value={params.authMethod || ''} readOnly={true}>
                <option value={''}>None</option>
                <option value={'ticket'}>Ticket</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='auth-ticket'>
              <Form.Label>Ticket</Form.Label>
              <Form.Control type='password' placeholder='Your secret ticket...' value={params.authTicket || ''} readOnly={true} />
            </Form.Group>

            <Form.Group controlId='auth-save'>
              <Form.Check type='checkbox' label='Save credentials' />
              <Form.Text>
                Credentials are saved
                {' '}
                <strong className='text-warning'>unencrypted</strong>
                {' '}
                with
                {' '}
                <a
                  href='https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  IndexedDB
                </a>
                {' '}
                or
                {' '}
                <a
                  href='https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  local storage
                </a>
                {' '}
                .
              </Form.Text>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Connect
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </Col>
      <Col>
        <p className='lead text-center text-muted'>Nothing happened yet</p>
      </Col>
    </Row>
  );
}