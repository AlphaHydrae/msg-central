import { WampEvent } from '../../domain/wamp/wamp.events';
import { WampConnectionState } from '../../domain/wamp/wamp.state';

export type AppEvent = WampEvent;

export interface DataState {
  readonly events: AppEvent[];
  readonly wampConnection: WampConnectionState | null;
}

export const initialDataState: DataState = {
  events: [],
  wampConnection: null
};