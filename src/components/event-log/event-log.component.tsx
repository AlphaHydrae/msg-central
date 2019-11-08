import moment from 'moment';
import React from 'react';
import { Card, ListGroup, ListGroupItemProps, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { AppEvent } from '../../concerns/data/data.state';

export interface EventLogStateProps {
  readonly events: AppEvent[];
}

export function EventLog(props: EventLogStateProps) {
  return (
    <Card>
      <Card.Header>Event Log</Card.Header>
      {props.events.length ? (
        <ListGroup variant='flush'>
          {props.events.map(event => <EventLine event={event} key={event.id} />)}
        </ListGroup>
      ) : (
        <Card.Body><NoEvents /></Card.Body>
      )}
    </Card>
  );
}

function NoEvents() {
  return (
    <p className='lead text-center text-muted'><em>Nothing has happened yet</em></p>
  );
}

interface EventLineProps {
  readonly event: AppEvent;
}

function EventLine(props: EventLineProps) {

  const event = props.event;

  let description;
  let variant: ListGroupItemProps['variant'] = 'info';

  switch (event.type) {
    case 'wampConnectionClosed':
      switch (event.reason) {
        case 'closed':
          description = <span>Closed WAMP connection to <strong>{event.params.routerUrl}</strong></span>;
          variant = 'secondary';
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

  return (
    <ListGroup.Item className='d-flex align-items-center justify-content-between' variant={variant}>
      {description}
      <OverlayTrigger
        overlay={(
          <Tooltip id={`event-${props.event.id}-time-tooltip`}>
            {moment(props.event.time).format('ddd, MMM D, Y HH:mm:ss.SSS ZZ')}
          </Tooltip>
        )}
      >
        <small className='text-muted'>{moment(event.time).format('HH:mm:ss')}</small>
      </OverlayTrigger>
    </ListGroup.Item>
  );
}