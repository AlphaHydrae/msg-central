import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import { GitHubRibbon } from './components/github-ribbon';
import { NavbarContainer } from './components/navbar/navbar.container';
import { Routes } from './routes';

export interface AppStateProps {
  readonly ready: boolean;
}

export function App(props: AppStateProps) {
  return (
    <Fragment>
      <GitHubRibbon />
      <NavbarContainer />
      <Container fluid={true}>
        {props.ready && <Routes />}
      </Container>
    </Fragment>
  );
}
