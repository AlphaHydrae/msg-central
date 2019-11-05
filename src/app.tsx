import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import { GitHubRibbon } from './components/github-ribbon';
import { Navbar } from './components/navbar/navbar.component';
import { Routes } from './routes';

export function App() {
  return (
    <Fragment>
      <GitHubRibbon />
      <Navbar />
      <Container fluid={true}>
        <Routes />
      </Container>
    </Fragment>
  );
}
