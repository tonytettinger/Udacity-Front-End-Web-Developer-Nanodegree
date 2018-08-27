import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Grid,
  Row,
  Col,
  PageHeader
} from 'react-bootstrap';

import Container from './Container'
import Dropdown from './Dropdown'
import List from './List'

class App extends Component {

     state = {
       venues: ['Steak','Burger','Juice','Pizza','Coffee', 'Tea'],
       markers: [],
       active: [true, true, true, true, true, true]
     }

     constructor(props) {
       super(props); 
       this.callVisibility = this.callVisibility.bind(this);
       this.getIndex = this.getIndex.bind(this);
     }

     // Dispatch the event.
  
   markerUpdate = (marker) => {
     this.setState({
         markers: [...this.state.markers, marker]
       })
   }

   changeActive(venueselected) {
      let venues = this.state.venues
      let index = venues.indexOf(venueselected)
      console.log(index)
      if(this.state.active[index] === true) {
         let activeState = Object.assign([], this.state.active)
         activeState[index] = false
         this.setState({
           active: activeState  
         })
      } else if (this.state.active[index] === false) {
        let activeState = Object.assign([], this.state.active)
        activeState[index] = true
        this.setState({
          active: activeState
        })
   }
  }

   getIndex(venue) {
     let venues = this.state.venues
     let index = venues.indexOf(venue)
     return index
   }

   callVisibility(cat) {
    this.changeActive(cat)
     this.state.markers.map(marker => {
       if(marker.category === cat && marker.visibility === 'visible'){
       marker.setVisible(false)
       marker.visibility = 'invisible'
       } else if (marker.category === cat && marker.visibility === 'invisible') {
         marker.setVisible(true)
        marker.visibility = 'visible'
       }
     })
   }  

   
  render() {
    return (
      <Grid fluid={true}>
        <Row>
           <Col md = {6}
           sm = {6} >
           <PageHeader className = 'header'>
             Neighborhood Map < small > Udacity final project < /small>   <
             /PageHeader>
            <Dropdown venues={this.state.venues} callVisibility={this.callVisibility} active={this.state.active} getIndex={this.getIndex}></Dropdown>
            <List venues = {this.state.venues}
            active = {this.state.active}
            getIndex = {this.getIndex}/>
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
