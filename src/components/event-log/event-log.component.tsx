import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { AppEvent } from '../../concerns/data/data.state';
import { EventLineContainer } from '../event-line/event-line.container';

export interface EventLogStateProps {
  readonly events: AppEvent[];
  readonly expandedEventIds: string[];
}

export function EventLog(props: EventLogStateProps) {
  return (
    <Card>
      <Card.Header>Event Log</Card.Header>
      {props.events.length ? (
        <ListGroup variant='flush'>
          {props.events.map(event => (
            <EventLineContainer
              event={event}
              key={event.id}
            />
          ))}
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