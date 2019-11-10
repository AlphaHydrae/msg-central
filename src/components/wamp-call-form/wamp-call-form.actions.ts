import { createAction } from '../../utils/store';
import { WampCallFormState } from './wamp-call-form.state';

export const editWampCallForm = createAction<Partial<WampCallFormState>>('EDIT_WAMP_CALL_FORM');