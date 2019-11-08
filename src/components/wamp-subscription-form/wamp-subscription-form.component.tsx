import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field as FormikField, Form as FormikForm, FormikProps, withFormik } from 'formik';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { FormInputChangeEvent } from '../../utils/forms';
import { WampSubscriptionFormState } from './wamp-subscription-form.state';

export interface WampSubscriptionFormStateProps {
  readonly form: WampSubscriptionFormState;
  readonly subscribing: boolean;
}

export interface WampSubscriptionFormDispatchProps {
  readonly editTopic: (event: FormInputChangeEvent) => void;
  readonly subscribe: (values: WampSubscriptionFormState) => void;
}

export type WampSubscriptionFormProps = WampSubscriptionFormDispatchProps & WampSubscriptionFormStateProps;

export function WampSubscriptionForm(props: WampSubscriptionFormProps) {
  return (
    <Card>
      <Card.Header>Subscribe to a WAMP topic</Card.Header>
      <Card.Body>
        <OuterForm {...props} />
      </Card.Body>
    </Card>
  );
}

const OuterForm = withFormik<WampSubscriptionFormProps, WampSubscriptionFormState>({
  mapPropsToValues: formikProps => formikProps.form,
  handleSubmit: (values, form) => form.props.subscribe(values)
})(InnerForm);

function InnerForm(props: FormikProps<WampSubscriptionFormState> & WampSubscriptionFormProps) {
  return (
    <FormikForm>

      <Form.Group controlId='topic'>
        <Form.Label>Topic</Form.Label>
        <FormikField
          as={Form.Control}
          type='text'
          placeholder='com.example.notifications'
          readOnly={props.subscribing}
          value={props.values.topic}
        />
      </Form.Group>

      <Button disabled={props.subscribing} type='submit' variant='primary'>
        <FontAwesomeIcon icon={faSignInAlt} />
        {' '}
        Subscribe
      </Button>

    </FormikForm>
  );
}