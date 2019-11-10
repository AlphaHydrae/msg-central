import { faCircleNotch, faSignInAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import { Action } from 'typescript-fsa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WsConnectionParams } from '../../domain/ws/ws.state';
import { FormInputChangeEvent, FormSubmitEvent, isFieldInvalid, isFormInvalid } from '../../utils/forms';
import { WsConnectionFormState, WsConnectionFormValidations } from './ws-connection-form.state';

export interface WsConnectionFormDispatchProps {
  readonly cancel: (params: WsConnectionParams) => void;
  readonly connect: (params: WsConnectionParams) => void;
  readonly editServerUrl: (event: FormInputChangeEvent) => void;
}

export interface WsConnectionFormStateProps {
  readonly connecting?: Action<WsConnectionParams>;
  readonly form: WsConnectionFormState;
  readonly validations: WsConnectionFormValidations;
}

export interface WsConnectionFormProps extends WsConnectionFormDispatchProps, WsConnectionFormStateProps {
  readonly onCancelClicked: () => void;
  readonly onSubmit: (event: FormSubmitEvent) => void;
}

export function WsConnectionFormComponent(props: WsConnectionFormProps) {
  return (
    <Card>
      <Card.Header>WebSocket Connection</Card.Header>
      <Card.Body>
        <Form onSubmit={props.onSubmit}>
          <Form.Group controlId='url'>
            <Form.Label>Server URL</Form.Label>
            <Form.Control
              type='text'
              isInvalid={isFieldInvalid(props.validations.serverUrl)}
              onChange={props.editServerUrl}
              placeholder='wss://ws.example.com'
              readOnly={props.connecting !== undefined}
              value={props.form.serverUrl}
            />
            {props.validations.serverUrl.required && (
              <Form.Text className='text-danger'>
                The URL of the WebSocket server is required.
              </Form.Text>
            )}
            {!props.validations.serverUrl.required && props.validations.serverUrl.valid && (
              <Form.Text className='text-danger'>
                Must be a valid WebSocket URL with the <code>ws://</code> or <code>wss://</code> protocol.
              </Form.Text>
            )}
          </Form.Group>

          <ButtonGroup className='float-right'>
            {props.connecting && (
              <Button
                type='button'
                onClick={props.onCancelClicked}
                variant='secondary'
              >
                <FontAwesomeIcon icon={faTimes} />
                {' '}
                Cancel
              </Button>
            )}
            <Button
              type='submit'
              disabled={props.connecting !== undefined || isFormInvalid(props.validations)}
              variant='primary'
            >
              <FontAwesomeIcon
                icon={props.connecting ? faCircleNotch : faSignInAlt}
                spin={props.connecting !== undefined}
              />
              {' '}
              {props.connecting ? 'Connecting' : 'Connect'}
            </Button>
          </ButtonGroup>
        </Form>
      </Card.Body>
    </Card>
  );
}