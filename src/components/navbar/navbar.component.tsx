import React, { Fragment } from 'react';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export interface NavbarStateProps {
  readonly ready: boolean;
}

export function Navbar(props: NavbarStateProps) {
  return (
    <BootstrapNavbar bg='light' className='mb-3' expand='lg'>
      <LinkContainer to={'/'}>
        <BootstrapNavbar.Brand>ASAP</BootstrapNavbar.Brand>
      </LinkContainer>
      {props.ready && (
        <Fragment>
          <BootstrapNavbar.Toggle aria-controls='navbar' />
          <BootstrapNavbar.Collapse id='navbar'>
            <Nav className='mr-auto'>
              <LinkContainer to={'/ws'}>
                <Nav.Link>WS</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/wamp'}>
                <Nav.Link>WAMP</Nav.Link>
              </LinkContainer>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Fragment>
      )}
    </BootstrapNavbar>
  );
}