import {Map} from 'google-maps-react';
import React, {
    Component
} from 'react';
import GoogleApiComponent from './GoogleApiComponent'
import Marker from './Marker'
import Error from './Error'

export class Container extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };
    }

    render() {
        const style = {
            height: '100vh',
        }

        if (!this.props.loaded) {
            return <div> Loading... If loading takes too long there might be a connection problem to the Google Maps Server. Please check your connection and try to reload the page.</div>
        }

        return (
            <Error>
                <Map google = {this.props.google} style={style}>
               
                < Marker markerUpdate = {
                    this.props.markerUpdate
                }
                markersLoaded = {
                    this.props.markersLoaded
                } venues={this.props.venues}/> 
                
                </Map>
            </Error>
        )
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyCQxUvYPmq2t3cMSz0ulVZ4Wu4ZJwImNjA"
})(Container)