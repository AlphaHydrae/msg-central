import React, { Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';

import { FormCheckboxChangeEvent, FormInputChangeEvent, FormSelectChangeEvent, FormSubmitEvent, isFormValid } from '../../utils/forms';
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
  readonly form: WampConnectionFormState;
  readonly validations: WampConnectionFormValidations;
}

export function WampConnectionForm(props: WampConnectionFormDispatchProps & WampConnectionFormStateProps) {

  const valid = isFormValid(props.validations);

  return (
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