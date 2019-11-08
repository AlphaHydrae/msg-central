import { createAction } from '../../utils/store';
import { WampSubscriptionFormState } from './wamp-subscription-form.state';

export const submitWampSubscriptionForm = createAction<WampSubscriptionFormState>('SUBMIT_WAMP_SUBSCRIPTION_FORM');