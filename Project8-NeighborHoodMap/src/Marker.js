import React, {
    Component
} from 'react';
import * as FoursquareAPI from './FoursquareAPI'
import Dropdown from './Dropdown'

export class Marker extends React.Component {
    state = {
        markersloaded: false
    }
    
    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
                if(!this.state.markersLoaded){
                this.props.venues.map(venuecategory =>{
                    FoursquareAPI.getList(venuecategory)
                    .then(venueresult => this.renderMarker(venueresult, venuecategory))
                    .catch(function (error) {
                        alert("Sorry, something went wrong when fetching the venues from FourSquare. Please reload the page.")
                    })
                    })
                    }
            
        }
    }

     renderMarker(venueresult, venuecategory) {
         let {
             map,
             google,
             mapCenter,
         } = this.props;


         venueresult.forEach(venue => {
             let lng = venue.location.lng
             let lat = venue.location.lat

             let position = new google.maps.LatLng(lat, lng);
             const pref = {
                 map: map,
                 position: position,
                 animation: google.maps.Animation.DROP,
                 category: venuecategory,
                 visibility: 'visible',
                 active: 'inactive',
                 name: venue.name
             };

             let marker = new google.maps.Marker(pref);
             
             this.props.markerUpdate(marker)
             let innerContent = `<div>Name: ${venue.name}</div>
             <div>Address: ${venue.location.formattedAddress}</div>`

             marker.info = new google.maps.InfoWindow({
                 content: innerContent
             });

             marker.activeWindow = false;
             
             marker.setVisible(this.props.visible)

             google.maps.event.addListener(marker, 'click', function () {
                 if (marker.activeWindow != false) {
                 marker.info.close(map, marker);
                 marker.activeWindow = false;
             } else{
                marker.info.open(map, marker);
                marker.activeWindow = true;
             }
             //toggle bouncing animation

             if (marker.getAnimation() !== null) {
                 marker.setAnimation(null);
             } else {
                 marker.setAnimation(google.maps.Animation.BOUNCE);
             }
             });

             google.maps.event.addListener(marker.info, 'closeclick', function () {
                 marker.setAnimation(null);
             });
         })
         this.setState({
             markersloaded: true,
         })
     }

    render() {
        return null;
    }
}

export default Marker