import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment } from 'react';
import { Card, ListGroup, ListGroupItemProps } from 'react-bootstrap';
import { Action } from 'typescript-fsa';

import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampSubscriptionParams } from '../../domain/wamp/wamp.state';
import { IconButton } from '../icon-button';
import { WampSubscriptionStatusContainer } from '../wamp-subscription-status/wamp-subscription-status.container';

export interface WampStatusStateProps {
  readonly connection?: WampConnectionParams;
  readonly openingConnection?: Action<WampConnectionParams>;
  readonly subscriptions: WampSubscriptionParams[];
}

export interface WampStatusDispatchProps {
  readonly disconnect: (connection: WampConnectionParams) => void;
}

export interface WampStatusProps extends WampStatusDispatchProps, WampStatusStateProps {
  readonly onDisconnectClicked: () => void;
}

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
            <strong>{props.connection.routerUrl}</strong>
            {' '}
            on realm
            {' '}
            <strong>{props.connection.realm}</strong>
          </span>
          <IconButton
            className='ml-3 float-right'
            icon={faSignOutAlt}
            id='wamp-disconnect'
            onClick={props.onDisconnectClicked}
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
          <strong>{props.openingConnection.payload.routerUrl}</strong>
          {' '}
          on realm
          {' '}
          <strong>{props.openingConnection.payload.realm}</strong>
          ...
        </span>
      )}
      {!props.connection && !props.openingConnection && (
        <span>Not connected to a WAMP router</span>
      )}
    </ListGroup.Item>
  );
}