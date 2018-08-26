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

import Placetypes from './Placetypes'
import Container from './Container'
import Dropdown from './Dropdown'

class App extends Component {

     state = {
       venues: ['steak', 'burger'],
       markersLoaded: false,
       markers: []
     }

     constructor(props) {
       super(props); 
       this.callVisibility = this.callVisibility.bind(this);
     }

     // Dispatch the event.
  
   markerUpdate = (marker) => {
     this.setState({
         markers: [...this.state.markers, marker]
       },
       function () {
         console.log(this.state.markers)
       })
   }

   callVisibility() {
     let markerState = Object.assign([], this.state.markers)
     markerState.forEach(marker => {
       marker.setVisible(false)
     })
     this.setState({
       markers: markerState 
     })
   }  
   
  render() {
    return (
      <Grid fluid={true}>
        <Row>
           <Col md = {6}
           sm = {6} >
           <PageHeader className = 'header' onClick={this.callVisibility}>
             Neighborhood Map < small > Udacity final project < /small>   <
             /PageHeader>
            <Dropdown venues={this.state.venues}></Dropdown>
               </Col>
               <Col md = {6} sm={6}>
                 <Container markerUpdate = {
                   this.markerUpdate
                 }
                 markersLoaded = {
                   this.state.markersLoaded
                 } venues={this.state.venues}> < /Container>
              </Col>
          
        </Row>
      </Grid>
    )
  }
}

export default App;
