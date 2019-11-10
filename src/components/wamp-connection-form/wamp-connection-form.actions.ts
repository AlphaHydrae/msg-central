import { createAction } from '../../utils/store';
import { WampConnectionFormState } from './wamp-connection-form.state';

export const editWampConnectionForm = createAction<Partial<WampConnectionFormState>>('EDIT_WAMP_CONNECTION_FORM');