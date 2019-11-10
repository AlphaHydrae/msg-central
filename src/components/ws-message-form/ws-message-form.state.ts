import { FormValidations } from '../../utils/forms';
import { RequiredValidation } from '../../utils/validations';

export interface WsMessageFormState {
  readonly data: string;
  readonly json: boolean;
}

export interface WsMessageFormValidations extends FormValidations {
  readonly data: RequiredValidation & {
    readonly json: boolean;
  };
}

export const initialWsMessageFormState: WsMessageFormState = {
  data: '',
  json: true
};