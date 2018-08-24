import React, {
    Component
} from 'react';
import * as FoursquareAPI from './FoursquareAPI'

export class Marker extends React.Component {

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
                FoursquareAPI.getList().then(res => this.renderMarker(res))
            
        }
    }

     renderMarker(venues) {
         let {
             map,
             google,
             mapCenter,
         } = this.props;

         venues.map(venue => {
             let lng = venue.location.lng
             let lat = venue.location.lat

             let position = new google.maps.LatLng(lat, lng);
             const pref = {
                 map: map,
                 position: position,
                 animation: google.maps.Animation.DROP
             };

             let marker = new google.maps.Marker(pref);

             marker.info = new google.maps.InfoWindow({
                 content: 'yay'
             });

             google.maps.event.addListener(marker, 'click', function () {
                 marker.info.open(map, marker);
             });
         })
     }

    render() {
        return null;
    }
}

export default Marker