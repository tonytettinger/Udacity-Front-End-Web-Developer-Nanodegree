import {Map} from 'google-maps-react';
import React, {
    Component
} from 'react';
import GoogleApiComponent from './GoogleApiComponent'
import * as FoursquareAPI from './FoursquareAPI'
import {
    Navbar,
    Jumbotron,
    Button,
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import Marker from './Marker'

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
            return <div> Loading... </div>
        }
        return (
                <Map google = {this.props.google} style={style}>
                < Marker markerUpdate = {
                    this.props.markerUpdate
                }
                markersLoaded = {
                    this.props.markersLoaded
                } venues={this.props.venues}/> 
                </Map>
        )
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyCQxUvYPmq2t3cMSz0ulVZ4Wu4ZJwImNjA"
})(Container)