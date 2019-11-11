import { faChevronDown, faChevronUp, faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Collapse, ListGroup, ListGroupItemProps, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Action, Success } from 'typescript-fsa';

import { AppEvent } from '../../concerns/data/data.state';
import { callWampProcedure, connectToWampRouter, handleWampConnectionClosed, handleWampTopicEvent, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { WampTopicEventDetailsCodec } from '../../domain/wamp/wamp.codecs';
import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampCallParams, WampTopicEvent } from '../../domain/wamp/wamp.state';
import { connectToWsServer, handleWsConnectionClosed, handleWsMessage, HandleWsMessageParams, sendWsMessage, SendWsMessageParams } from '../../domain/ws/ws.actions';
import { decode } from '../../utils/codecs';
import { IconButton } from '../icon-button';

export interface EventLineDispatchProps {
  readonly hide: () => void;
  readonly show: () => void;
}

export interface EventLineOwnProps {
  readonly event: AppEvent<any>;
}

export interface EventLineStateProps {
  readonly expanded: boolean;
}

export type EventLineProps = EventLineDispatchProps & EventLineOwnProps & EventLineStateProps;

export function EventLineComponent(props: EventLineProps) {

  const event = props.event;
  const { description, details, variant } = getWampEventDetails(event.action) || getWsEventDetails(event.action) || {
    description: <span>Unknown event</span>,
    details: undefined,
    variant: 'info'
  };

  return (
    <ListGroup.Item variant={variant}>
      <div className='d-flex align-items-center justify-content-between'>
        {description}
        <span>
          <OverlayTrigger
            overlay={(
              <Tooltip id={`event-${event.id}-time-tooltip`}>
                {moment(event.time).format('ddd, MMM D, Y HH:mm:ss.SSS ZZ')}
              </Tooltip>
            )}
          >
            <small className='text-muted'>{moment(event.time).format('HH:mm:ss')}</small>
          </OverlayTrigger>
          {details && (
            <IconButton
              className='ml-2'
              icon={props.expanded ? faChevronUp : faChevronDown}
              id={`wamp-event-${event.id}-${props.expanded ? 'hide' : 'show'}`}
              onClick={props.expanded ? props.hide : props.show}
              size='sm'
              tooltip={props.expanded ? 'Hide details' : 'Show details'}
              type='button'
              variant='primary'
            />
          )}
        </span>
      </div>

      {details && (
        <Collapse appear={true} in={props.expanded} mountOnEnter={true} unmountOnExit={true}>
          {details}
        </Collapse>
      )}
    </ListGroup.Item>
  );
}

function getWampEventDetails(action: Action<any>) {

  let description;
  let details;
  let variant: ListGroupItemProps['variant'] = 'info';

  if (callWampProcedure.failed.match(action)) {
    switch (action.payload.error.message) {
      case 'wamp.error.no_such_procedure':
        description = <span>No such WAMP procedure <strong>{action.payload.params.procedure}</strong></span>;
        variant = 'danger';
        break;
      default:
        description = <span>Error calling WAMP procedure <strong>{action.payload.params.procedure}</strong></span>;
        variant = 'danger';
    }
  } else if (callWampProcedure.done.match(action)) {
    description = <span>Called WAMP procedure <strong>{action.payload.params.procedure}</strong></span>;
    details = getWampProcedureCallDetails(action);
    variant = 'success';
  } else if (connectToWampRouter.done.match(action)) {
    description = (
      <span>
        Connected to WAMP router at
        {' '}
        <strong>{action.payload.params.routerUrl}</strong>
        {' '}
        on realm
        {' '}
        <strong>{action.payload.params.realm}</strong>
      </span>
    );
    variant = 'success';
  } else if (connectToWampRouter.failed.match(action)) {
    return getWampConnectionClosedDetails(action.payload.params, action.payload.error.reason);
  } else if (handleWampConnectionClosed.match(action)) {
    return getWampConnectionClosedDetails(action.payload.params, action.payload.reason);
  } else if (handleWampTopicEvent.match(action)) {
    const topicEventDetails = decode(WampTopicEventDetailsCodec, action.payload.event.details);
    description = (
      <span>
        Received WAMP event
        {topicEventDetails ? <Fragment> on topic <strong>{topicEventDetails.topic}</strong></Fragment> : undefined}
      </span>
    );
    details = getWampTopicEventDetails(action.payload.event);
  } else if (subscribeToWampTopic.done.match(action)) {
    description = <span>Subscribed to WAMP topic <strong>{action.payload.params.topic}</strong></span>;
    variant = 'success';
  } else if (unsubscribeFromWampTopic.done.match(action)) {
    description = <span>Unsubscribed from WAMP topic <strong>{action.payload.params.topic}</strong></span>;
    variant = 'secondary';
  } else {
    return;
  }

  return { description, details, variant };
}

function getWampConnectionClosedDetails(params: WampConnectionParams, reason: string) {

  let description;
  let variant: ListGroupItemProps['variant'] = 'info';

  switch (reason) {
    case 'closed':
      description = <span>Closed WAMP connection to <strong>{params.routerUrl}</strong></span>;
      variant = 'secondary';
      break;
    case 'lost':
      description = <span>Connection lost to WAMP router <strong>{params.routerUrl}</strong></span>;
      variant = 'danger';
      break;
    case 'unreachable':
      description = <span>WAMP router URL <strong>{params.routerUrl}</strong> is unreachable</span>;
      variant = 'danger';
      break;
    default:
      description = <span>Connection to WAMP router closed due to: {reason}</span>;
      variant = 'warning';
  }

  return { description, variant, details: undefined };
}

function getWampProcedureCallDetails(action: Action<Success<WampCallParams, unknown>>) {
  return (
    <div className='mt-2'>
      <strong>Result</strong>
      <pre className='mt-1'>{JSON.stringify(action.payload.result, undefined, 2)}</pre>
    </div>
  );
}

function getWampTopicEventDetails(event: WampTopicEvent) {
  return (
    <div className='mt-2'>

      <div>
        <strong>Arguments</strong>
        <pre className='mt-1'>{JSON.stringify(event.args, undefined, 2)}</pre>
      </div>

      <div className='mt-2'>
        <strong>Keyword arguments</strong>
        <pre className='mt-1'>{JSON.stringify(event.kwargs, undefined, 2)}</pre>
      </div>

      <div className='mt-2'>
        <strong>Details</strong>
        <pre className='mt-1'>{JSON.stringify(event.details, undefined, 2)}</pre>
      </div>

    </div>
  );
}

function getWsEventDetails(action: Action<any>) {

  let description;
  let details;
  let variant: ListGroupItemProps['variant'] = 'info';

  if (connectToWsServer.done.match(action)) {
    description = <span>Connected to WebSocket server at <strong>{action.payload.params.serverUrl}</strong></span>;
    variant = 'success';
  } else if (connectToWsServer.failed.match(action)) {
    description = <span>Error connecting to WebSocket server at <strong>{action.payload.params.serverUrl}</strong></span>;
    variant = 'danger';
  } else if (handleWsConnectionClosed.match(action)) {
    description = <span>Disconnected from WebSocket server at <strong>{action.payload.params.serverUrl}</strong></span>;
    variant = 'secondary';
  } else if (handleWsMessage.match(action)) {
    description = (
      <span>
        <FontAwesomeIcon className='mr-1' icon={faLongArrowAltDown} />
        {' '}
        Received WebSocket message
      </span>
    );
    details = getWsMessageDetails(action);
  } else if (sendWsMessage.match(action)) {
    description = (
      <span>
        <FontAwesomeIcon className='mr-1' icon={faLongArrowAltUp} />
        {' '}
        Sent WebSocket message
      </span>
    );
    details = getWsSentMessageDetails(action);
  } else {
    return;
  }

  return { description, details, variant };
}

function getWsMessageDetails(action: Action<HandleWsMessageParams>) {

  const data = action.payload.data;

  let description;
  if (typeof data === 'string') {
    try {
      description = JSON.stringify(JSON.parse(data), undefined, 2);
    } catch (_) {
      description = String(data);
    }
  } else {
    description = String(data);
  }

  return (
    <div className='mt-2'>
      <strong>Message data</strong>
      <pre className='mt-1'>{description}</pre>
    </div>
  );
}

function getWsSentMessageDetails(action: Action<SendWsMessageParams>) {
  return (
    <div className='mt-2'>
      <strong>Message data</strong>
      <pre className='mt-1'>{action.payload.message.data}</pre>
    </div>
  );
}