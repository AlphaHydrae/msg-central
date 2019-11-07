export interface WampConnectionFormState {
  readonly routerUrl: string;
  readonly realm: string;
  readonly namespace: string;
  readonly authMethod: 'ticket' | null;
  readonly authId: string;
  readonly authTicket: string;
  readonly saveAuth: boolean;
}

export interface WampConnectionFormValidations {
  readonly authIdPresent: boolean;
  readonly authTicketPresent: boolean;
  readonly realmPresent: boolean;
  readonly routerUrlPresent: boolean;
  readonly routerUrlValid: boolean;
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