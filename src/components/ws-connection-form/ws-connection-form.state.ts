import { FormValidations } from '../../utils/forms';
import { RequiredValidation } from '../../utils/validations';

export interface WsConnectionFormState {
  readonly serverUrl: string;
}

export interface WsConnectionFormValidations extends FormValidations {
  readonly serverUrl: RequiredValidation & {
    readonly valid: boolean;
  };
}

export const initialWsConnectionFormState: WsConnectionFormState = {
  serverUrl: ''
};