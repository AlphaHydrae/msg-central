import { createAction } from '../../utils/store';
import { WsMessageFormState } from './ws-message-form.state';

export const editWsMessageForm = createAction<Partial<WsMessageFormState>>('EDIT_WS_MESSAGE_FORM');