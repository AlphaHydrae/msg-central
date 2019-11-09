import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { FormInputChangeEvent, FormSubmitEvent, isFormInvalid } from '../../utils/forms';
import { WampSubscriptionFormState, WampSubscriptionFormValidations } from './wamp-subscription-form.state';

export interface WampSubscriptionFormStateProps {
  readonly form: WampSubscriptionFormState;
  readonly subscribing: boolean;
  readonly validations: WampSubscriptionFormValidations;
}

export interface WampSubscriptionFormDispatchProps {
  readonly editTopic: (event: FormInputChangeEvent) => void;
  readonly subscribe: (values: WampSubscriptionFormState) => void;
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
              readOnly={props.subscribing}
              value={props.form.topic}
            />
          </Form.Group>

          <Button disabled={props.subscribing || isFormInvalid(props.validations)} type='submit' variant='primary'>
            <FontAwesomeIcon icon={faSignInAlt} />
            {' '}
            Subscribe
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}