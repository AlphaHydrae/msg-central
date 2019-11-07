import { AppState } from './state';

export const selectDataState = (state: AppState) => state.data;
export const selectSessionState = (state: AppState) => state.session;