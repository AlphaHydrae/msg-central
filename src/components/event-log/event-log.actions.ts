import { createAction } from '../../utils/store';

export const hideEventDetails = createAction<string>('HIDE_EVENT_DETAILS');
export const setShowAllEventDetails = createAction<boolean>('SET_SHOW_ALL_EVENT_DETAILS');
export const showEventDetails = createAction<string>('SHOW_EVENT_DETAILS');