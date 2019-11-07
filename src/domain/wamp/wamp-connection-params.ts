import { WampAuthParams } from './wamp-auth-params';

export interface WampConnectionParams {
  readonly routerUrl: string;
  readonly realm: string;
  readonly namespace?: string;
  readonly auth?: WampAuthParams;
}