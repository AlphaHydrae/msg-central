import { createAction } from '../../utils/store';
import { WampPageConnectionFormState } from './wamp.state';

export const editWampConnectionForm = createAction<Partial<WampPageConnectionFormState>>('EDIT_WAMP_CONNECTION_FORM');