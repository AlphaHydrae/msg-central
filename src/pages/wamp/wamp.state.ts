export interface WampPageConnectionFormState {
  readonly routerUrl: string;
  readonly realm: string;
  readonly namespace: string;
  readonly authMethod: 'ticket' | null;
  readonly authId: string;
  readonly authTicket: string;
  readonly saveAuth: boolean;
}

export interface WampPageState {
  readonly connectionParams: WampPageConnectionFormState;
}

export const initialWampPageState: WampPageState = {
  connectionParams: {
    routerUrl: '',
    realm: '',
    namespace: '',
    authMethod: null,
    authId: '',
    authTicket: '',
    saveAuth: false
  }
};