import React, { Fragment } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { FormCheckboxChangeEvent, FormInputChangeEvent, FormSelectChangeEvent, FormSubmitEvent, isFieldInvalid, isFormInvalid } from '../../utils/forms';
import { WampConnectionFormState, WampConnectionFormValidations } from './wamp-connection-form.state';

export interface WampConnectionFormDispatchProps {
  readonly connect: (event: FormSubmitEvent) => void;
  readonly editAuthId: (event: FormInputChangeEvent) => void;
  readonly editAuthMethod: (event: FormSelectChangeEvent) => void;
  readonly editAuthTicket: (event: FormInputChangeEvent) => void;
  readonly editNamespace: (event: FormInputChangeEvent) => void;
  readonly editRealm: (event: FormInputChangeEvent) => void;
  readonly editRouterUrl: (event: FormInputChangeEvent) => void;
  readonly editSaveAuth: (event: FormCheckboxChangeEvent) => void;
}

export interface WampConnectionFormStateProps {
  readonly connecting: boolean;
  readonly form: WampConnectionFormState;
  readonly validations: WampConnectionFormValidations;
}

export function WampConnectionForm(props: WampConnectionFormDispatchProps & WampConnectionFormStateProps) {
  return (
    <Card>
      <Card.Header>WAMP Connection</Card.Header>
      <Card.Body>
        <Form onSubmit={props.connect}>
          <Form.Group controlId='url'>
            <Form.Label>Router URL</Form.Label>
            <Form.Control
              type='text'
              isInvalid={isFieldInvalid(props.validations.routerUrl)}
              onChange={props.editRouterUrl}
              placeholder='wss://wamp.example.com/ws'
              readOnly={props.connecting}
              value={props.form.routerUrl}
            />
            {props.validations.routerUrl.required && (
              <Form.Text className='text-danger'>
                The URL of the WAMP router is required.
              </Form.Text>
            )}
            {!props.validations.routerUrl.required && props.validations.routerUrl.valid && (
              <Form.Text className='text-danger'>
                Must be a valid WebSocket URL with the <code>ws://</code> or <code>wss://</code> protocol.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='realm'>
            <Form.Label>Realm</Form.Label>
            <Form.Control
              type='text'
              isInvalid={isFieldInvalid(props.validations.realm)}
              onChange={props.editRealm}
              placeholder='realm1'
              readOnly={props.connecting}
              value={props.form.realm}
            />
            {props.validations.realm.required && (
              <Form.Text className='text-danger'>
                The WAMP realm to connect to is required.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='namespace'>
            <Form.Label>Namespace</Form.Label>
            <Form.Control
              type='text'
              onChange={props.editNamespace}
              placeholder='com.example'
              readOnly={props.connecting}
              value={props.form.namespace}
            />
            <Form.Text>
              Optional prefix for all procedure and topic names.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='auth-type'>
            <Form.Label>Authentication</Form.Label>
            <Form.Control
              as='select'
              onChange={props.editAuthMethod}
              readOnly={props.connecting}
              value={props.form.authMethod || undefined}
            >
              <option value={''}>None</option>
              <option value={'ticket'}>Ticket</option>
            </Form.Control>
          </Form.Group>

          {props.form.authMethod && <WampAuthForm {...props} />}

          <Button disabled={props.connecting || isFormInvalid(props.validations)} type='submit' variant='primary'>
            Connect
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

function WampAuthForm(props: WampConnectionFormDispatchProps & WampConnectionFormStateProps) {

  const params = props.form;

  let authMethodInput;
  if (params.authMethod === 'ticket') {
    authMethodInput = (
      <Form.Group controlId='auth-ticket'>
        <Form.Label>Ticket</Form.Label>
        <Form.Control
          type='password'
          isInvalid={isFieldInvalid(props.validations.authTicket)}
          onChange={props.editAuthTicket}
          placeholder='Your secret ticket...'
          readOnly={props.connecting}
          value={params.authTicket}
        />
        {props.validations.authTicket.required && (
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
          isInvalid={isFieldInvalid(props.validations.authId)}
          onChange={props.editAuthId}
          placeholder='Your authentication ID...'
          readOnly={props.connecting}
          value={params.authId}
        />
        {props.validations.authId.required && (
          <Form.Text className='text-danger'>
            An authentication ID is required.
          </Form.Text>
        )}
      </Form.Group>

      {authMethodInput}

      <Form.Group controlId='auth-save'>
        <Form.Check
          type='checkbox'
          checked={params.saveAuth}
          label='Save credentials'
          readOnly={props.connecting}
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