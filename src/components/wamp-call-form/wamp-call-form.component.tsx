import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampCallParams } from '../../domain/wamp/wamp.state';
import { FormInputChangeEvent, FormSubmitEvent, isFieldInvalid, isFormInvalid } from '../../utils/forms';
import { WampCallFormState, WampCallFormValidations } from './wamp-call-form.state';

export interface WampCallFormDispatchProps {
  readonly call: (params: WampCallParams) => void;
  readonly editArgs: (event: FormInputChangeEvent) => void;
  readonly editKwargs: (event: FormInputChangeEvent) => void;
  readonly editProcedure: (event: FormInputChangeEvent) => void;
}

export interface WampCallFormStateProps {
  readonly calling: boolean;
  readonly connection?: WampConnectionParams;
  readonly form: WampCallFormState;
  readonly topicPrefix?: string;
  readonly validations: WampCallFormValidations;
}

export interface WampCallFormProps extends WampCallFormDispatchProps, WampCallFormStateProps {
  readonly onSubmit: (event: FormSubmitEvent) => void;
}

export function WampCallFormComponent(props: WampCallFormProps) {
  return (
    <Card className='mt-3'>
      <Card.Header>Call a WAMP procedure</Card.Header>
      <Card.Body>
        <Form onSubmit={props.onSubmit}>

          <Form.Group controlId='procedure'>
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type='text'
              onChange={props.editProcedure}
              placeholder='com.example.action'
              readOnly={!props.connection || props.calling}
              value={props.form.procedure}
            />
            {props.topicPrefix && (
              <Form.Text>Configured prefix: <strong>{props.topicPrefix}</strong></Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='args'>
            <Form.Label>Arguments</Form.Label>
            <Form.Control
              as='textarea'
              isInvalid={isFieldInvalid(props.validations.args)}
              onChange={props.editArgs}
              placeholder='[ "arg1", "arg2" ]'
              readOnly={!props.connection || props.calling}
              rows='1'
              value={props.form.args}
            />
            {props.validations.args.valid && (
              <Form.Text className='text-danger'>
                Arguments must be a valid JSON array.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='kwargs'>
            <Form.Label>Keyword arguments</Form.Label>
            <Form.Control
              as='textarea'
              isInvalid={isFieldInvalid(props.validations.kwargs)}
              onChange={props.editKwargs}
              placeholder='{ "key1": "value1", "key2": "value2" }'
              readOnly={!props.connection || props.calling}
              rows='1'
              value={props.form.kwargs}
            />
            {props.validations.kwargs.valid && (
              <Form.Text className='text-danger'>
                Keyword arguments must be a valid JSON object.
              </Form.Text>
            )}
          </Form.Group>

          <Button disabled={!props.connection || props.calling || isFormInvalid(props.validations)} type='submit' variant='primary'>
            <FontAwesomeIcon icon={faPlay} />
            {' '}
            Subscribe
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}