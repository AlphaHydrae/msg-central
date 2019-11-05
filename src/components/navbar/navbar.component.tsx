import React from 'react';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export function Navbar() {
  return (
    <BootstrapNavbar bg='light' className='mb-3' expand='lg'>
      <LinkContainer to={'/'}>
        <BootstrapNavbar.Brand>ASAP</BootstrapNavbar.Brand>
      </LinkContainer>
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
    </BootstrapNavbar>
  );
}