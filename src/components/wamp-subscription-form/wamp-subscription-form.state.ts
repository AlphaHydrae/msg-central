import { FormValidations } from '../../utils/forms';
import { RequiredValidation } from '../../utils/validations';

export interface WampSubscriptionFormState {
  readonly topic: string;
}

export interface WampSubscriptionFormValidations extends FormValidations {
  readonly topic: RequiredValidation;
}

export const initialWampSubscriptionFormState: WampSubscriptionFormState = {
  topic: ''
};