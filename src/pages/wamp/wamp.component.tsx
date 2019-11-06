import React, { Fragment } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import { FormCheckboxChangeEvent, FormInputChangeEvent, FormSelectChangeEvent } from '../../utils/forms';
import { WampPageConnectionFormState } from './wamp.state';

export interface WampPageDispatchProps {
  readonly editAuthMethod: (event: FormSelectChangeEvent) => void;
  readonly editAuthTicket: (event: FormInputChangeEvent) => void;
  readonly editNamespace: (event: FormInputChangeEvent) => void;
  readonly editRealm: (event: FormInputChangeEvent) => void;
  readonly editRouterUrl: (event: FormInputChangeEvent) => void;
  readonly editSaveAuth: (event: FormCheckboxChangeEvent) => void;
}

export interface WampPageValidations {
  readonly routerUrlValid: boolean;
}

export interface WampPageStateProps {
  readonly connectionParams: WampPageConnectionFormState;
  readonly validations: WampPageValidations;
}

export function WampPage(props: WampPageDispatchProps & WampPageStateProps) {

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
              <Form.Control
                type='text'
                placeholder='wss://wamp.example.com/ws'
                value={params.routerUrl}
                onChange={props.editRouterUrl}
                isInvalid={!props.validations.routerUrlValid}
              />
              {!props.validations.routerUrlValid && (
                <Form.Text className='text-danger'>
                  Must be a valid WebSocket URL starting with <code>ws://</code> or <code>wss://</code>.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='realm'>
              <Form.Label>Realm</Form.Label>
              <Form.Control
                type='text'
                placeholder='realm1'
                value={params.realm}
                onChange={props.editRealm}
              />
            </Form.Group>

            <Form.Group controlId='namespace'>
              <Form.Label>Namespace</Form.Label>
              <Form.Control
                type='text'
                placeholder='com.example'
                value={params.namespace}
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
                value={params.authMethod || undefined}
                onChange={props.editAuthMethod}
              >
                <option value={''}>None</option>
                <option value={'ticket'}>Ticket</option>
              </Form.Control>
            </Form.Group>

            {params.authMethod && <WampAuthForm {...props} />}

            <Button variant='primary' type='submit'>
              Connect
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </Col>
      <Col>
        <Card className='mb-3'>
          <Card.Header>Status</Card.Header>
          <Card.Body>
            <p className='lead text-center text-muted'>No connections</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Event Log</Card.Header>
          <Card.Body>
            <p className='lead text-center text-muted'>Nothing is happening</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

function WampAuthForm(props: WampPageDispatchProps & WampPageStateProps) {

  const params = props.connectionParams;

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
        />
      </Form.Group>
    );
  }

  return (
    <Fragment>
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