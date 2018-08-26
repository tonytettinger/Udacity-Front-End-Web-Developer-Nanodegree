import React, {
    Component
} from 'react';
import * as FoursquareAPI from './FoursquareAPI'

export class Marker extends React.Component {
    state = {
        markers: [],
        markersloaded: false
    }
    

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
                if(!this.state.markersLoaded){
                this.props.venues.map(venuecategory =>{
                    FoursquareAPI.getList(venuecategory).then(venueresult => this.renderMarker(venueresult, venuecategory))
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
                 visibility: 'visible'
             };

             let marker = new google.maps.Marker(pref);
             
             this.setState({
                 markers: [...this.state.markers, marker]},
                     function () {
                         console.log(this.state.markers)
             })
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