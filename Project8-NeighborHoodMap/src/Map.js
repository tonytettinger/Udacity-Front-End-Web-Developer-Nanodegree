// API Key AIzaSyCQxUvYPmq2t3cMSz0ulVZ4Wu4ZJwImNjA
import React, {
    Component
} from 'react';

export class Map extends React.Component {

    Map.propTypes = {
        google: React.PropTypes.object,
        zoom: React.PropTypes.number,
        initialCenter: React.PropTypes.object
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

     componentDidMount() {
         this.loadMap();
     }

    loadMap() {
         if (this.props && this.props.google) {
             // google is available
             const {
                 google
             } = this.props;
             const maps = google.maps;
             const mapRef = this.refs.map;
             const node = ReactDOM.findDOMNode(mapRef);

             let zoom = 18;
             let lat = 37.774929;
             let lng = -122.419416;
             const center = new maps.LatLng(lat, lng);
             const mapConfig = Object.assign({}, {
                 center: center,
                 zoom: zoom
             })
             this.map = new maps.Map(node, mapConfig);
    }
    }

     renderChildren() {
         const {
             children
         } = this.props;

         if (!children) return;

         return React.Children.map(children, c => {
             return React.cloneElement(c, {
                 map: this.map,
                 google: this.props.google,
                 mapCenter: this.state.currentLocation
             });
         })
     }
    render() {       
        return ( <div role='application' ref = 'map'>
            Loading map...
            {
                this.renderChildren()
            }
            <
            /div>
        )
    }
}