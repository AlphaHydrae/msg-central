import { FormValidations } from '../../utils/forms';
import { RequiredValidation } from '../../utils/validations';

export interface WampConnectionFormState {
  readonly routerUrl: string;
  readonly realm: string;
  readonly namespace: string;
  readonly authMethod: 'ticket' | null;
  readonly authId: string;
  readonly authTicket: string;
  readonly saveAuth: boolean;
}

export interface WampConnectionFormValidations extends FormValidations {
  readonly authId: RequiredValidation;
  readonly authTicket: RequiredValidation;
  readonly realm: RequiredValidation;
  readonly routerUrl: RequiredValidation & {
    readonly valid: boolean;
  };
}

export const initialWampConnectionFormState: WampConnectionFormState = {
  routerUrl: '',
  realm: '',
  namespace: '',
  authMethod: null,
  authId: '',
  authTicket: '',
  saveAuth: false
};