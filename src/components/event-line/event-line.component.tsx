import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Collapse, ListGroup, ListGroupItemProps, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { AppEvent } from '../../concerns/data/data.state';
import { WampEvent } from '../../domain/wamp/wamp.events';
import { WampTopicEvent } from '../../domain/wamp/wamp.state';
import { IconButton } from '../icon-button';

export interface EventLineDispatchProps {
  readonly hide: () => void;
  readonly show: () => void;
}

export interface EventLineOwnProps {
  readonly event: AppEvent;
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

interface WampTopicEventDetailsProps {
  readonly event: WampTopicEvent;
}

function WampTopicEventDetails(props: WampTopicEventDetailsProps) {
  return (
    <Fragment>

      <div className='mt-2'>
        <strong>Arguments</strong>
        <pre className='mt-1'>{JSON.stringify(props.event.args, undefined, 2)}</pre>
      </div>

      <div className='mt-2'>
        <strong>Keyword arguments</strong>
        <pre className='mt-1'>{JSON.stringify(props.event.kwargs, undefined, 2)}</pre>
      </div>

      <div className='mt-2'>
        <strong>Details</strong>
        <pre className='mt-1'>{JSON.stringify(props.event.details, undefined, 2)}</pre>
      </div>

    </Fragment>
  );
}

function getEventLineParts(event: WampEvent) {

  let description;
  let details;
  let variant: ListGroupItemProps['variant'] = 'info';

  switch (event.type) {
    case 'wampConnectionClosed':
      switch (event.reason) {
        case 'closed':
          description = <span>Closed WAMP connection to <strong>{event.params.routerUrl}</strong></span>;
          variant = 'secondary';
          break;
        case 'lost':
          description = <span>Connection lost to WAMP router <strong>{event.params.routerUrl}</strong></span>;
          variant = 'danger';
          break;
        case 'unreachable':
          description = <span>WAMP router URL <strong>{event.params.routerUrl}</strong> is unreachable</span>;
          variant = 'danger';
          break;
        default:
          description = <span>Connection to WAMP router closed due to: {event.reason}</span>;
          variant = 'warning';
      }
      break;
    case 'wampConnectionOpen':
      description = (
        <span>
          Connected to WAMP router at
          {' '}
          <strong>{event.params.routerUrl}</strong>
          {' '}
          on realm
          {' '}
          <strong>{event.params.realm}</strong>
        </span>
      );
      variant = 'success';
      break;
    case 'wampTopicEventReceived':
      description = <span>Received event</span>;
      details = <WampTopicEventDetails event={event.event} />;
      break;
    case 'wampTopicSubscribed':
      description = <span>Subscribed to WAMP topic <strong>{event.subscription.topic}</strong></span>;
      variant = 'success';
      break;
    case 'wampTopicUnsubscribed':
      description = <span>Unsubscribed from WAMP topic <strong>{event.subscription.topic}</strong></span>;
      variant = 'secondary';
      break;
    default:
      description = <span>Unknown event</span>;
  }

  return { description, details, variant };
}