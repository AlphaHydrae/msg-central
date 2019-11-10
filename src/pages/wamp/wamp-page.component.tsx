import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Action } from 'typescript-fsa';

import { EventLogContainer } from '../../components/event-log/event-log.container';
import { WampControlsContainer } from '../../components/wamp-controls/wamp-controls.container';
import { WampStatusContainer } from '../../components/wamp-status/wamp-status.container';
import { AppEvent } from '../../concerns/data/data.state';

export interface WampPageProps {
  readonly eventLogFilter: (event: AppEvent<Action<any>>) => boolean;
}

export function WampPageComponent(props: WampPageProps) {
  return (
    <Row>
      <Col>
        <WampControlsContainer />
      </Col>
      <Col>
        <WampStatusContainer />
        <EventLogContainer filter={props.eventLogFilter} />
      </Col>
    </Row>
  );
}