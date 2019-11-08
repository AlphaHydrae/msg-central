import { faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment } from 'react';
import { Card, ListGroup, ListGroupItemProps } from 'react-bootstrap';

import { OpeningWampConnection } from '../../concerns/comm/comm.state';
import { WampConnectionState, WampSubscription } from '../../domain/wamp/wamp.state';
import { IconButton } from '../icon-button';

export type WampSubscriptionStatus = 'subscribed' | 'subscribing' | 'unsubscribed' | 'unsubscribing';

export interface WampSubscriptionWithStatus extends WampSubscription {
  readonly status: WampSubscriptionStatus;
}

export interface WampStatusStateProps {
  readonly connection?: WampConnectionState;
  readonly openingConnection?: OpeningWampConnection;
  readonly subscriptions: WampSubscriptionWithStatus[];
}

export interface WampStatusDispatchProps {
  readonly delete: (subscription: WampSubscription) => void;
  readonly disconnect: () => void;
  readonly unsubscribe: (subscription: WampSubscription) => void;
}

export type WampStatusProps = WampStatusDispatchProps & WampStatusStateProps;

export function WampStatus(props: WampStatusProps) {
  return (
    <Card className='mb-3'>
      <Card.Header>Status</Card.Header>
      <ListGroup variant='flush'>
        <WampConnectionStatus {...props} />
        {props.subscriptions.map(sub => (
          <WampSubscriptionStatus
            delete={props.delete}
            key={sub.id}
            subscription={sub}
            unsubscribe={props.unsubscribe}
          />
        ))}
      </ListGroup>
    </Card>
  );
}

function WampConnectionStatus(props: WampStatusProps) {

  let variant: ListGroupItemProps['variant'] = 'secondary';
  if (props.connection) {
    variant = 'success';
  } else if (props.openingConnection) {
    variant = 'warning';
  }

  return (
    <ListGroup.Item className='d-flex align-items-center justify-content-between' variant={variant}>
      {props.connection && (
        <Fragment>
          <span>
            Connected to
            {' '}
            <strong>{props.connection.params.routerUrl}</strong>
            {' '}
            on realm
            {' '}
            <strong>{props.connection.params.realm}</strong>
          </span>
          <IconButton
            className='ml-3 float-right'
            icon={faSignOutAlt}
            id='wamp-disconnect'
            onClick={props.disconnect}
            size='sm'
            tooltip='Disconnect'
            type='button'
            variant='secondary'
          />
        </Fragment>
      )}
      {props.openingConnection && (
        <span>
          Connecting to
          {' '}
          <strong>{props.openingConnection.params.routerUrl}</strong>
          {' '}
          on realm
          {' '}
          <strong>{props.openingConnection.params.realm}</strong>
          ...
        </span>
      )}
      {!props.connection && !props.openingConnection && (
        <span>Not connected to a WAMP router</span>
      )}
    </ListGroup.Item>
  );
}

interface WampSubscriptionStatusProps {
  readonly delete: (subscription: WampSubscription) => void;
  readonly subscription: WampSubscriptionWithStatus;
  readonly unsubscribe: (subscription: WampSubscription) => void;
}

function WampSubscriptionStatus(props: WampSubscriptionStatusProps) {

  let description;
  let variant: ListGroupItemProps['variant'] = 'secondary';
  switch (props.subscription.status) {
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

  // FIXME: remove closure
  const deleteSub = () => props.delete(props.subscription);
  const unsubscribe = () => props.unsubscribe(props.subscription);

  return (
    <ListGroup.Item className='d-flex align-items-center justify-content-between' variant={variant}>
      {description}
      {(props.subscription.status === 'subscribed' || props.subscription.status === 'unsubscribed') && (
        <IconButton
          icon={faTrash}
          id={`subscription-${props.subscription.id}-unsubscribe`}
          onClick={props.subscription.status === 'subscribed' ? unsubscribe : deleteSub}
          size='sm'
          tooltip='Unsubscribe'
          type='button'
          variant='secondary'
        />
      )}
    </ListGroup.Item>
  );
}