import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Navbar,
  Jumbotron,
  Button,
  Grid,
  Row,
  Col,
  PageHeader
} from 'react-bootstrap';

import Container from './Container'

class App extends Component {
  render() {
    return (
      <Grid>
        
        <Row>
          < PageHeader >
            Neighborhood Map < small > Udacity final project < /small> <
            /PageHeader>
          < Container xs = {
            6
          }
          md = {
            4
          } > < /Container>
        </Row>
      </Grid>
    )
  }
}

export default App;
