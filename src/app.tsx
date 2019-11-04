import React, { Fragment } from 'react';
import { Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import { Routes } from './routes';

export function App() {
  return (
    <Fragment>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>ASAP</Navbar.Brand>
      </Navbar>
      <Routes />
    </Fragment>
  );
};
