import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment } from 'react';
import { Card, ListGroup, ListGroupItemProps } from 'react-bootstrap';

import { OpeningWampConnection } from '../../concerns/comm/comm.state';
import { WampConnectionState, WampSubscription } from '../../domain/wamp/wamp.state';
import { IconButton } from '../icon-button';
import { WampSubscriptionStatusContainer } from '../wamp-subscription-status/wamp-subscription-status.container';

export interface WampStatusStateProps {
  readonly connection?: WampConnectionState;
  readonly openingConnection?: OpeningWampConnection;
  readonly subscriptions: WampSubscription[];
}

export interface WampStatusDispatchProps {
  readonly disconnect: () => void;
}

export type WampStatusProps = WampStatusDispatchProps & WampStatusStateProps;

export function WampStatus(props: WampStatusProps) {
  return (
    <Card className='mb-3'>
      <Card.Header>Status</Card.Header>
      <ListGroup variant='flush'>
        <WampConnectionStatus {...props} />
        {props.subscriptions.map(sub => (
          <WampSubscriptionStatusContainer
            key={sub.id}
            subscription={sub}
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