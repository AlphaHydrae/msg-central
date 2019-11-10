import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface HomePageProps {
  readonly wampConnectionOpen: boolean;
  readonly wsConnectionOpen: boolean;
}

export function HomePageComponent(props: HomePageProps) {
  return (
    <div className='container text-center'>
      <div className='col-8 mt-5 offset-2'>
        <CardDeck>
          <Card bg={props.wsConnectionOpen ? 'success' : 'dark'} text='white'>
            <Card.Header><h2 className='mb-0'>WebSocket</h2></Card.Header>
            <Card.Body>
              Connect to a WebSocket server to send and receive messages.
            </Card.Body>
            <Card.Footer>
              <Link className='btn btn-primary' to={'/ws'}>Let's go</Link>
            </Card.Footer>
          </Card>
          <Card bg={props.wampConnectionOpen ? 'success' : 'dark'} text='white'>
            <Card.Header><h2 className='mb-0'>WAMP</h2></Card.Header>
            <Card.Body>
              Connect to a Web Application Messaging Protocol (WAMP) router to call procedures and subscribe to topics.
            </Card.Body>
            <Card.Footer>
              <Link className='btn btn-primary' to={'/wamp'}>Let's go</Link>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    </div>
  );
}