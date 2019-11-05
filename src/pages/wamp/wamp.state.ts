import { WampConnectionParams } from '../../domain/wamp-connection-params';

export interface WampPageState {
  readonly connectionParams: WampConnectionParams;
}

export const initialWampPageState: WampPageState = {
  connectionParams: {
    routerUrl: '',
    realm: '',
    namespace: null,
    authId: null,
    authMethod: null,
    authTicket: null
  }
};