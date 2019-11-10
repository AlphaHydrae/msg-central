import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { WsConnectionParams } from '../../domain/ws/ws.state';
import { FormInputChangeEvent, FormSubmitEvent, isFieldInvalid, isFormInvalid } from '../../utils/forms';
import { WsConnectionFormState, WsConnectionFormValidations } from './ws-connection-form.state';

export interface WsConnectionFormDispatchProps {
  readonly connect: (params: WsConnectionParams) => void;
  readonly editServerUrl: (event: FormInputChangeEvent) => void;
}

export interface WsConnectionFormStateProps {
  readonly connecting: boolean;
  readonly form: WsConnectionFormState;
  readonly validations: WsConnectionFormValidations;
}

export interface WsConnectionFormProps extends WsConnectionFormDispatchProps, WsConnectionFormStateProps {
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
              readOnly={props.connecting}
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

          <Button disabled={props.connecting || isFormInvalid(props.validations)} type='submit' variant='primary'>
            Connect
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}