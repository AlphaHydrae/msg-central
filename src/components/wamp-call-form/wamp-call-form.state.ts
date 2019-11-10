import { FormValidations } from '../../utils/forms';
import { RequiredValidation } from '../../utils/validations';

export interface WampCallFormState {
  readonly args: string;
  readonly kwargs: string;
  readonly procedure: string;
}

export interface WampCallFormValidations extends FormValidations {
  readonly args: {
    readonly valid: boolean;
  };
  readonly kwargs: {
    readonly valid: boolean;
  };
  readonly procedure: RequiredValidation;
}

export const initialWampCallFormState: WampCallFormState = {
  args: '',
  kwargs: '',
  procedure: ''
};