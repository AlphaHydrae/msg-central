import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { AppEvent } from '../../concerns/data/data.state';
import { EventLineContainer } from '../event-line/event-line.container';
import { IconButton } from '../icon-button';

export interface EventLogDispatchProps {
  readonly setShowEventDetails: (value: boolean) => void;
}

export interface EventLogOwnProps {
  readonly filter?: (event: AppEvent<any>) => boolean;
}

export interface EventLogStateProps {
  readonly events: Array<AppEvent<any>>;
  readonly showEventDetails: boolean;
}

export interface EventLogProps extends EventLogDispatchProps, EventLogOwnProps, EventLogStateProps {
  readonly onToggleShowEventDetails: () => void;
}

export function EventLog(props: EventLogProps) {
  return (
    <Card>
      <Card.Header className='d-flex align-items-center justify-content-between'>
        <span>Event Log</span>
        <IconButton
          type='button'
          disabled={!props.events.length}
          icon={props.showEventDetails ? faChevronUp : faChevronDown}
          id='event-log-toggle'
          onClick={props.onToggleShowEventDetails}
          size='sm'
          tooltip={props.showEventDetails ? 'Hide event details by default' : 'Show event details by default'}
          variant='secondary'
        />
      </Card.Header>
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