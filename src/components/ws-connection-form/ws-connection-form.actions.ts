import { createAction } from '../../utils/store';
import { WsConnectionFormState } from './ws-connection-form.state';

export const editWsConnectionForm = createAction<Partial<WsConnectionFormState>>('EDIT_WS_CONNECTION_FORM');