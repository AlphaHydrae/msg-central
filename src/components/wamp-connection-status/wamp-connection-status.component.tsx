import { faSignInAlt, faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment } from 'react';
import { ListGroup, ListGroupItemProps, ButtonGroup } from 'react-bootstrap';

import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampSubscriptionParams } from '../../domain/wamp/wamp.state';
import { IconButton } from '../icon-button';
import { WampSubscriptionStatusContainer } from '../wamp-subscription-status/wamp-subscription-status.container';

export type WampConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export interface WampConnectionStatusDispatchProps {
  readonly connect: () => void;
  readonly delete: () => void;
  readonly disconnect: () => void;
}

export interface WampConnectionStatusOwnProps {
  readonly connection: WampConnectionParams;
}

export interface WampConnectionStatusStateProps {
  readonly status: WampConnectionStatus;
  readonly subscriptions: WampSubscriptionParams[];
}

export type WampConnectionStatusProps = WampConnectionStatusDispatchProps & WampConnectionStatusOwnProps & WampConnectionStatusStateProps;

export function WampConnectionStatusComponent(props: WampConnectionStatusProps) {

  let variant: ListGroupItemProps['variant'] = 'secondary';
  if (props.status === 'connected') {
    variant = 'success';
  } else if (props.status === 'connecting') {
    variant = 'warning';
  }

  return (
    <Fragment>
      <ListGroup.Item className='d-flex align-items-center justify-content-between' variant={variant}>
        <span>
          {props.status === 'connected' && <Fragment>Connected to</Fragment>}
          {props.status === 'connecting' && <Fragment>Connecting to</Fragment>}
          {props.status === 'disconnected' && <Fragment>Connection to</Fragment>}
          {' '}
          <strong>{props.connection.routerUrl}</strong>
          {' '}
          on realm
          {' '}
          <strong>{props.connection.realm}</strong>
          {props.status === 'connecting' && <Fragment>...</Fragment>}
        </span>
        {props.status === 'disconnected' && (
          <ButtonGroup>
            <IconButton
              icon={faTrash}
              id={`wamp-connection-${props.connection.id}-delete`}
              onClick={props.delete}
              size='sm'
              tooltip='Delete'
              type='button'
              variant='danger'
            />
            <IconButton
              icon={faSignInAlt}
              id={`wamp-connection-${props.connection.id}-connect`}
              onClick={props.connect}
              size='sm'
              tooltip='Connect'
              type='button'
              variant='primary'
            />
          </ButtonGroup>
        )}
        {props.status === 'connected' && (
          <IconButton
            icon={faSignOutAlt}
            id={`wamp-connection-${props.connection.id}-disconnect`}
            onClick={props.disconnect}
            size='sm'
            tooltip='Disconnect'
            type='button'
            variant='secondary'
          />
        )}
      </ListGroup.Item>
      {props.subscriptions.map(sub => (
        <WampSubscriptionStatusContainer
          key={sub.id}
          subscription={sub}
        />
      ))}
    </Fragment>
  );
}