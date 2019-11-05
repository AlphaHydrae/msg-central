export interface WampConnectionParams {
  readonly routerUrl: string;
  readonly realm: string;
  readonly namespace: string | null;
  readonly authId: string | null;
  readonly authMethod: string | null;
  readonly authTicket: string | null;
}