import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { SendWsMessageParams } from '../../domain/ws/ws.actions';
import { WsConnectionParams } from '../../domain/ws/ws.state';
import { FormCheckboxChangeEvent, FormInputChangeEvent, FormSubmitEvent, isFieldInvalid, isFormInvalid } from '../../utils/forms';
import { WsMessageFormState, WsMessageFormValidations } from './ws-message-form.state';

export interface WsMessageFormDispatchProps {
  readonly send: (params: SendWsMessageParams) => void;
  readonly editData: (event: FormInputChangeEvent) => void;
  readonly editJson: (event: FormCheckboxChangeEvent) => void;
}

export interface WsMessageFormStateProps {
  readonly connection?: WsConnectionParams;
  readonly form: WsMessageFormState;
  readonly validations: WsMessageFormValidations;
}

export interface WsMessageFormProps extends WsMessageFormDispatchProps, WsMessageFormStateProps {
  readonly onSubmit: (event: FormSubmitEvent) => void;
}

export function WsMessageFormComponent(props: WsMessageFormProps) {
  return (
    <Card className='mt-3'>
      <Card.Header>Send a WebSocket message</Card.Header>
      <Card.Body>
        <Form onSubmit={props.onSubmit}>

          <Form.Group controlId='data'>
            <Form.Label>Message data</Form.Label>
            <Form.Control
              as='textarea'
              isInvalid={!props.validations.data.required && isFieldInvalid(props.validations.data)}
              onChange={props.editData}
              placeholder={props.form.json ? '"hello"' : 'hello'}
              readOnly={!props.connection}
              rows='3'
              value={props.form.data}
            />
            {props.validations.data.json && (
              <Form.Text className='text-danger'>
                Message data must be valid JSON (strings must be double-quoted).
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='json'>
            <Form.Check
              type='checkbox'
              checked={props.form.json}
              label='Message data is JSON'
              readOnly={!props.connection}
              onChange={props.editJson}
            />
          </Form.Group>

          <Button
            className='float-right'
            disabled={!props.connection || isFormInvalid(props.validations)}
            type='submit'
            variant='primary'
          >
            <FontAwesomeIcon icon={faPlay} />
            {' '}
            Send
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}