import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampSubscriptionParams } from '../../domain/wamp/wamp.state';
import { FormInputChangeEvent, FormSubmitEvent, isFormInvalid } from '../../utils/forms';
import { WampSubscriptionFormState, WampSubscriptionFormValidations } from './wamp-subscription-form.state';

export interface WampSubscriptionFormStateProps {
  readonly connection?: WampConnectionParams;
  readonly form: WampSubscriptionFormState;
  readonly subscribing: boolean;
  readonly topicPrefix?: string;
  readonly validations: WampSubscriptionFormValidations;
}

export interface WampSubscriptionFormDispatchProps {
  readonly editTopic: (event: FormInputChangeEvent) => void;
  readonly subscribe: (values: WampSubscriptionParams) => void;
}

export interface WampSubscriptionFormProps extends WampSubscriptionFormDispatchProps, WampSubscriptionFormStateProps {
  readonly submit: (event: FormSubmitEvent) => void;
}

export function WampSubscriptionForm(props: WampSubscriptionFormProps) {
  return (
    <Card>
      <Card.Header>Subscribe to a WAMP topic</Card.Header>
      <Card.Body>
        <Form onSubmit={props.submit}>

          <Form.Group controlId='topic'>
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type='text'
              onChange={props.editTopic}
              placeholder='com.example.notifications'
              readOnly={!props.connection || props.subscribing}
              value={props.form.topic}
            />
            {props.topicPrefix && (
              <Form.Text>Configured prefix: <strong>{props.topicPrefix}</strong></Form.Text>
            )}
          </Form.Group>

          <Button
            className='float-right'
            disabled={!props.connection || props.subscribing || isFormInvalid(props.validations)}
            type='submit'
            variant='primary'
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            {' '}
            Subscribe
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}