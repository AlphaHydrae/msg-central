import { WampEvent } from '../../domain/wamp/wamp.events';
import { createAction } from '../../utils/store';

export const hideEventDetails = createAction<WampEvent>('HIDE_EVENT_DETAILS');
export const showEventDetails = createAction<WampEvent>('SHOW_EVENT_DETAILS');