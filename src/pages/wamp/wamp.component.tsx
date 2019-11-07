import React, { Fragment } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';

import { WampConnectionState } from '../../concerns/data/data.state';
import { FormCheckboxChangeEvent, FormInputChangeEvent, FormSelectChangeEvent, FormSubmitEvent, isFormValid } from '../../utils/forms';
import { WampPageConnectionFormState } from './wamp.state';

export interface WampPageDispatchProps {
  readonly connect: (event: FormSubmitEvent) => void;
  readonly disconnect: () => void;
  readonly editAuthId: (event: FormInputChangeEvent) => void;
  readonly editAuthMethod: (event: FormSelectChangeEvent) => void;
  readonly editAuthTicket: (event: FormInputChangeEvent) => void;
  readonly editNamespace: (event: FormInputChangeEvent) => void;
  readonly editRealm: (event: FormInputChangeEvent) => void;
  readonly editRouterUrl: (event: FormInputChangeEvent) => void;
  readonly editSaveAuth: (event: FormCheckboxChangeEvent) => void;
}

export interface WampPageValidations {
  readonly authIdPresent: boolean;
  readonly authTicketPresent: boolean;
  readonly realmPresent: boolean;
  readonly routerUrlPresent: boolean;
  readonly routerUrlValid: boolean;
}

export interface WampPageStateProps {
  readonly connection: WampConnectionState | null;
  readonly form: WampPageConnectionFormState;
  readonly validations: WampPageValidations;
}

export function WampPage(props: WampPageDispatchProps & WampPageStateProps) {
  return (
    <Row>
      <Col>
        <ConnectionCard {...props} />
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

function ConnectionCard(props: WampPageDispatchProps & WampPageStateProps) {

  const valid = isFormValid(props.validations);

  return (
    <Card>
      <Card.Header>Connection</Card.Header>
      <Card.Body>
        <Form onSubmit={props.connect}>
          <Form.Group controlId='url'>
            <Form.Label>Router URL</Form.Label>
            <Form.Control
              type='text'
              placeholder='wss://wamp.example.com/ws'
              value={props.form.routerUrl}
              onChange={props.editRouterUrl}
              isInvalid={!props.validations.routerUrlPresent || !props.validations.routerUrlValid}
            />
            {!props.validations.routerUrlPresent && (
              <Form.Text className='text-danger'>
                The URL of the WAMP router is required.
              </Form.Text>
            )}
            {!props.validations.routerUrlValid && (
              <Form.Text className='text-danger'>
                Must be a valid WebSocket URL with the <code>ws://</code> or <code>wss://</code> protocol.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='realm'>
            <Form.Label>Realm</Form.Label>
            <Form.Control
              type='text'
              placeholder='realm1'
              value={props.form.realm}
              onChange={props.editRealm}
              isInvalid={!props.validations.realmPresent}
            />
            {!props.validations.realmPresent && (
              <Form.Text className='text-danger'>
                The WAMP realm to connect to is required.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='namespace'>
            <Form.Label>Namespace</Form.Label>
            <Form.Control
              type='text'
              placeholder='com.example'
              value={props.form.namespace}
              onChange={props.editNamespace}
            />
            <Form.Text>
              Optional prefix for all procedure and topic names.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='auth-type'>
            <Form.Label>Authentication</Form.Label>
            <Form.Control
              as='select'
              value={props.form.authMethod || undefined}
              onChange={props.editAuthMethod}
            >
              <option value={''}>None</option>
              <option value={'ticket'}>Ticket</option>
            </Form.Control>
          </Form.Group>

          {props.form.authMethod && <WampAuthForm {...props} />}

          <Button variant='primary' type='submit' disabled={!valid}>
            Connect
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

function WampAuthForm(props: WampPageDispatchProps & WampPageStateProps) {

  const params = props.form;

  let authMethodInput;
  if (params.authMethod === 'ticket') {
    authMethodInput = (
      <Form.Group controlId='auth-ticket'>
        <Form.Label>Ticket</Form.Label>
        <Form.Control
          type='password'
          placeholder='Your secret ticket...'
          value={params.authTicket}
          onChange={props.editAuthTicket}
          isInvalid={!props.validations.authTicketPresent}
        />
        {!props.validations.authTicketPresent && (
          <Form.Text className='text-danger'>
            The ticket to authenticate with is required.
          </Form.Text>
        )}
      </Form.Group>
    );
  }

  return (
    <Fragment>
      <Form.Group controlId='auth-id'>
        <Form.Label>Identifier</Form.Label>
        <Form.Control
          type='text'
          placeholder='Your authentication ID...'
          value={params.authId}
          onChange={props.editAuthId}
          isInvalid={!props.validations.authIdPresent}
        />
        {!props.validations.authIdPresent && (
          <Form.Text className='text-danger'>
            An authentication ID is required.
          </Form.Text>
        )}
      </Form.Group>

      {authMethodInput}

      <Form.Group controlId='auth-save'>
        <Form.Check
          type='checkbox'
          label='Save credentials'
          checked={params.saveAuth}
          onChange={props.editSaveAuth}
        />
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
    </Fragment>
  );
}