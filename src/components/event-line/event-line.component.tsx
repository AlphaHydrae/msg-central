import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import React from 'react';
import { Collapse, ListGroup, ListGroupItemProps, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Action, Success } from 'typescript-fsa';

import { AppEvent } from '../../concerns/data/data.state';
import { callWampProcedure, connectToWampRouter, handleWampConnectionClosed, handleWampTopicEvent, subscribeToWampTopic, unsubscribeFromWampTopic, WampConnectionClosedParams } from '../../domain/wamp/wamp.actions';
import { WampCallParams, WampTopicEvent } from '../../domain/wamp/wamp.state';
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
  const { description, details, variant } = getEventLineParts(event);

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

function getEventLineParts(event: AppEvent<any>) {

  let description;
  let details;
  let variant: ListGroupItemProps['variant'] = 'info';

  const action = event.action;

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
  } else if (handleWampConnectionClosed.match(action)) {
    return getEventLineConnectionClosedParts(action);
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
  } else if (handleWampTopicEvent.match(action)) {
    description = <span>Received event</span>;
    details = getWampTopicEventDetails(action.payload.event);
  } else if (subscribeToWampTopic.done.match(action)) {
    description = <span>Subscribed to WAMP topic <strong>{action.payload.params.topic}</strong></span>;
    variant = 'success';
  } else if (unsubscribeFromWampTopic.done.match(action)) {
    description = <span>Unsubscribed from WAMP topic <strong>{action.payload.params.topic}</strong></span>;
    variant = 'secondary';
  } else {
    description = <span>Unknown event</span>;
  }

  return { description, details, variant };
}

function getEventLineConnectionClosedParts(action: Action<WampConnectionClosedParams>) {

  let description;
  let variant: ListGroupItemProps['variant'] = 'info';

  switch (action.payload.reason) {
    case 'closed':
      description = <span>Closed WAMP connection to <strong>{action.payload.params.routerUrl}</strong></span>;
      variant = 'secondary';
      break;
    case 'lost':
      description = <span>Connection lost to WAMP router <strong>{action.payload.params.routerUrl}</strong></span>;
      variant = 'danger';
      break;
    case 'unreachable':
      description = <span>WAMP router URL <strong>{action.payload.params.routerUrl}</strong> is unreachable</span>;
      variant = 'danger';
      break;
    default:
      description = <span>Connection to WAMP router closed due to: {action.payload.reason}</span>;
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