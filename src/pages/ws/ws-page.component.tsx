import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Action } from 'typescript-fsa';

import { EventLogContainer } from '../../components/event-log/event-log.container';
import { WsControlsContainer } from '../../components/ws-controls/ws-controls.container';
import { WsStatusContainer } from '../../components/ws-status/ws-status.container';
import { AppEvent } from '../../concerns/data/data.state';

export interface WsPageProps {
  readonly eventLogFilter: (event: AppEvent<Action<any>>) => boolean;
}

export function WsPageComponent(props: WsPageProps) {
  return (
    <Row>
      <Col>
        <WsControlsContainer />
      </Col>
      <Col>
        <WsStatusContainer />
        <EventLogContainer filter={props.eventLogFilter} />
      </Col>
    </Row>
  );
}