import React, { Component } from 'react';
import './App.css';
import {
  Map
} from 'google-maps-react';
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
       active: [true, true, true, true, true, true],
       style: ['info', 'info', 'info', 'info', 'info', 'info']
     }

     constructor(props) {
       super(props); 
       this.callVisibility = this.callVisibility.bind(this);
       this.getIndex = this.getIndex.bind(this);
       this.toggleMarkers = this.toggleMarkers.bind(this);
     }

     // Dispatch the event.
  
   markerUpdate = (marker) => {
     this.setState({
         markers: [...this.state.markers, marker]
       })
   }

   toggleMarkers(venue){
     let google = window.google
      let venueIndex = this.getIndex(venue)
      let active = this.state.active[venueIndex]
      let map = window.google.map
      let style = this.state.style[venueIndex]
     
     this.state.markers.map(marker => {
        if(venue === marker.category && active && style === 'info'){
        marker.setAnimation(google.maps.Animation.BOUNCE)
        marker.info.open(map, marker);
         let markerStyleStatus = Object.assign([], this.state.style)
         markerStyleStatus[venueIndex] = 'success'
         this.setState({
           style: markerStyleStatus
         })
        } else if (venue === marker.category) {
          //close info window and stop bouncing
           marker.info.close(map, marker)
            marker.setAnimation(null)
           let markerStyleStatus = Object.assign([], this.state.style)
           markerStyleStatus[venueIndex] = 'info'
           this.setState({
             style: markerStyleStatus
           })

        }
        
     })
   }

   changeActive(venueselected) {
      let venues = this.state.venues
      let index = venues.indexOf(venueselected)
      console.log(index)
      if(this.state.active[index] === true) {
         let activeState = Object.assign([], this.state)
         activeState.active[index] = false
         activeState.style[index] = 'info'
         this.setState({
          activeState
         })
         
      } else if (this.state.active[index] === false) {
        let activeState = Object.assign([], this.state)
        activeState.active[index] = true
        activeState.style[index] = 'info'
        this.setState({
          activeState
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
           <PageHeader className = 'header' onClick={this.markerBounce}>
              <div> Neighborhood Map</div>
              <small>By Antal Tettinger</small></PageHeader>
            <Dropdown venues={this.state.venues} callVisibility={this.callVisibility} active={this.state.active} getIndex={this.getIndex}></Dropdown>
            <List venues = {this.state.venues}
            active = {this.state.active}
            getIndex = {this.getIndex} toggleMarkers={this.toggleMarkers} style={this.state.style}/>
               </Col>
               <Col md = {6} sm={6}>
                 <Container markerUpdate = {this.markerUpdate}
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
