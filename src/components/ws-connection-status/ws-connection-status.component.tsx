import React, { Fragment } from 'react';
import { ButtonGroup, ListGroup, ListGroupItemProps } from 'react-bootstrap';

import { faSignInAlt, faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { WsConnectionParams } from '../../domain/ws/ws.state';
import { IconButton } from '../icon-button';

export type WsConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'disconnecting';

export interface WsConnectionStatusDispatchProps {
  readonly connect: () => void;
  readonly delete: () => void;
  readonly disconnect: () => void;
}

export interface WsConnectionStatusOwnProps {
  readonly connection: WsConnectionParams;
}

export interface WsConnectionStatusStateProps {
  readonly status: WsConnectionStatus;
}

export type WsConnectionStatusProps = WsConnectionStatusDispatchProps & WsConnectionStatusOwnProps & WsConnectionStatusStateProps;

export function WsConnectionStatusComponent(props: WsConnectionStatusProps) {

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
          {props.status === 'connected' && <Fragment>Connected to WebSocket server</Fragment>}
          {props.status === 'connecting' && <Fragment>Connecting to WebSocket server</Fragment>}
          {props.status === 'disconnected' && <Fragment>Connection to WebSocket server</Fragment>}
          {' '}
          <strong>{props.connection.serverUrl}</strong>
          {props.status === 'connecting' && <Fragment>...</Fragment>}
        </span>
        {props.status === 'disconnected' && (
          <ButtonGroup>
            <IconButton
              icon={faTrash}
              id={`ws-connection-${props.connection.id}-delete`}
              onClick={props.delete}
              size='sm'
              tooltip='Delete'
              type='button'
              variant='danger'
            />
            <IconButton
              icon={faSignInAlt}
              id={`ws-connection-${props.connection.id}-connect`}
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
            id={`ws-connection-${props.connection.id}-disconnect`}
            onClick={props.disconnect}
            size='sm'
            tooltip='Disconnect'
            type='button'
            variant='secondary'
          />
        )}
      </ListGroup.Item>
    </Fragment>
  );
}