import React, { Component } from 'react';
import ErrorBoundary from './Error';
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
import Description from './Description'
import ListVenues from './ListVenues'

class App extends Component {

     state = {
       venues: ['Steak','Burger','Noodle','Pizza','Shake', 'Soup'],
       markers: [],
       active: [false, false, false, false, false, false],
       activeMarkers: []
     }

     constructor(props) {
       super(props); 
       this.callVisibility = this.callVisibility.bind(this);
       this.getIndex = this.getIndex.bind(this);
       this.listClick = this.listClick.bind(this);
       this.showAll = this.showAll.bind(this)
     }

     // Dispatch the event.
  
   markerUpdate = (marker) => {
     this.setState({
         markers: [...this.state.markers, marker],
         activeMarkers: [...this.state.markers, marker]
       })
   }
 
   listClick(currentActiveMarker){
     let google = window.google
      let map = window.google.map
     
     this.state.activeMarkers.map(marker => {
        if(currentActiveMarker === marker && marker.active === 'inactive'){
        marker.setAnimation(google.maps.Animation.BOUNCE)
        marker.info.open(map, marker);
        marker.active = 'active'
        } else if (currentActiveMarker === marker && marker.active === 'active') {
          //close info window and stop bouncing
           marker.info.close(map, marker)
            marker.setAnimation(null)
            marker.active = 'inactive'
        }
     })
   }

   getIndex(venue) {
     let venues = this.state.venues
     let index = venues.indexOf(venue)
     return index
   }

   callVisibility(cat) {
      let venues = this.state.venues
      let index = venues.indexOf(cat)
      let falseArray = [false, false, false, false, false, false]
      let google = window.google
      let map = window.google.map
      
        falseArray[index] = true
        let newArray = Object.assign([], this.state.active)
        newArray = falseArray
       
    let activeMarkerArray = []

     this.state.markers.map(marker => {
       if(marker.category === cat){
       marker.setVisible(true)
       marker.visibility = 'visible'
       activeMarkerArray.push(marker)
       } else if (marker.category !== cat) {
         marker.setVisible(false)
        marker.visibility = 'invisible'
        marker.active = 'inactive'
        marker.info.close(map, marker)
        marker.setAnimation(null)
       }
     })

      this.setState({
        active: newArray,
        activeMarkers: activeMarkerArray
      })
   }
   
   showAll(){
     let google = window.google
     let map = window.google.map

     this.state.markers.map(marker => {
       marker.setVisible(true)
       marker.active = 'inactive'
       marker.info.close(map, marker)
       marker.setAnimation(null)
     })
     this.setState({activeMarkers: this.state.markers})
   }

  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col sm={4}>
          <PageHeader className = 'header'
          onClick = {this.getActiveMarkers}>
            <div> Neighborhood Map </div><small> By Antal Tettinger</small> 
          </PageHeader>
          
          <Dropdown 
          venues = {
            this.state.venues
          }
          callVisibility = {
            this.callVisibility
          }
          active = {
            this.state.active
          }
          getIndex = {
            this.getIndex
          }
          showAll = {this.showAll}/>
          
          <Description/>
      
          </Col>
            
          <Col sm={3}>
            <ListVenues activeMarkers = {this.state.activeMarkers} venues={this.state.venues} listClick={this.listClick}/>
           </Col>
               <Col sm={5}>
                 <Container markerUpdate = {this.markerUpdate}
                 markersLoaded = {
                   this.state.markersLoaded
                 } venues={this.state.venues}> 
                 </Container>      
              </Col>
        </Row>
      </Grid>
    )
  }
}

export default App;
