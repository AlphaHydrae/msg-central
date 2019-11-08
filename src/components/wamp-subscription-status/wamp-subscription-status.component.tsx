import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ListGroup, ListGroupItemProps } from 'react-bootstrap';

import { WampSubscription, WampSubscriptionStatus } from '../../domain/wamp/wamp.state';
import { IconButton } from '../icon-button';

export interface WampSubscriptionStatusDispatchProps {
  readonly delete: () => void;
  readonly unsubscribe: () => void;
}

export interface WampSubscriptionStatusOwnProps {
  readonly subscription: WampSubscription;
}

export interface WampSubscriptionStatusStateProps {
  readonly status: WampSubscriptionStatus;
}

export type WampSubscriptionStatusProps =
  WampSubscriptionStatusDispatchProps &
  WampSubscriptionStatusOwnProps &
  WampSubscriptionStatusStateProps
;

export function WampSubscriptionStatusComponent(props: WampSubscriptionStatusProps) {

  let description;
  let variant: ListGroupItemProps['variant'] = 'secondary';
  switch (props.status) {
    case 'subscribed':
      description = <span>Subscribed to topic <strong>{props.subscription.topic}</strong></span>;
      variant = 'success';
      break;
    case 'subscribing':
      description = <span>Subscribing to topic <strong>{props.subscription.topic}</strong>...</span>;
      variant = 'warning';
      break;
    case 'unsubscribing':
      description = <span>Unsubscribing from topic <strong>{props.subscription.topic}</strong>...</span>;
      variant = 'warning';
      break;
    default:
      description = <span>Will subscribe to topic <strong>{props.subscription.topic}</strong> once connected</span>;
  }

  return (
    <ListGroup.Item className='d-flex align-items-center justify-content-between' variant={variant}>
      {description}
      {(props.status === 'subscribed' || props.status === 'unsubscribed') && (
        <IconButton
          icon={faTrash}
          id={`subscription-${props.subscription.id}-unsubscribe`}
          onClick={props.status === 'subscribed' ? props.unsubscribe : props.delete}
          size='sm'
          tooltip='Unsubscribe'
          type='button'
          variant='secondary'
        />
      )}
    </ListGroup.Item>
  );
}