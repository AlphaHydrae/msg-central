import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { EventLogContainer } from '../../components/event-log/event-log.container';
import { WampControlsContainer } from '../../components/wamp-controls/wamp-controls.container';
import { WampStatusContainer } from '../../components/wamp-status/wamp-status.container';

export function WampPage() {
  return (
    <Row>
      <Col>
        <WampControlsContainer />
      </Col>
      <Col>
        <WampStatusContainer />
        <EventLogContainer />
      </Col>
    </Row>
  );
}