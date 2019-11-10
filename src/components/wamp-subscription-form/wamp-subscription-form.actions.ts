import { createAction } from '../../utils/store';
import { WampSubscriptionFormState } from './wamp-subscription-form.state';

export const editWampSubscriptionForm = createAction<Partial<WampSubscriptionFormState>>('EDIT_WAMP_SUBSCRIPTION_FORM');