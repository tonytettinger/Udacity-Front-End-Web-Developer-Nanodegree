import {Map} from 'google-maps-react';
import React, {
    Component
} from 'react';
import GoogleApiComponent from './GoogleApiComponent'
import Marker from './Marker'
import * as FoursquareAPI from './FoursquareAPI'

export class Container extends React.Component {

       componentDidMount() {
           const self = this;
           FoursquareAPI.getList().then(markers => 
                self.setState({
                markers: markers
            })
        )
       }

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }

        const pos = {
            lat: 37.759703,
            lng: -122.428093
        }

        if (!this.props.loaded) {
            return <div> Loading... < /div>
        }
        return (<div stlye={style}>
                <Map google = {this.props.google}>
                
                <Marker lat = {
                        37.759703
                }
                    lng = {
                        -122.428093
                    }
                    />
                </Map>
                </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyCQxUvYPmq2t3cMSz0ulVZ4Wu4ZJwImNjA"
})(Container)