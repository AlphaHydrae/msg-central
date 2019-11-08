import { AppState } from './state';

export const selectControlState = (state: AppState) => state.control;
export const selectDataState = (state: AppState) => state.data;
export const selectSessionState = (state: AppState) => state.session;