import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { EventLogContainer } from '../../components/event-log/event-log.container';
import { WsControlsContainer } from '../../components/ws-controls/ws-controls.container';
import { WsStatusContainer } from '../../components/ws-status/ws-status.container';

export function WsPageComponent() {
  return (
    <Row>
      <Col>
        <WsControlsContainer />
      </Col>
      <Col>
        <WsStatusContainer />
        <EventLogContainer />
      </Col>
    </Row>
  );
}