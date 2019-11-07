import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';

export interface WampConnectionState {
  readonly connected: boolean;
  readonly params: WampConnectionParams;
}

export interface DataState {
  readonly wampConnection: WampConnectionState | null;
}

export const initialDataState: DataState = {
  wampConnection: null
};