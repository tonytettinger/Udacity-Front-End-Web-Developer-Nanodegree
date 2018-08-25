import {Map} from 'google-maps-react';
import React, {
    Component
} from 'react';
import GoogleApiComponent from './GoogleApiComponent'
import Marker from './Marker'
import * as FoursquareAPI from './FoursquareAPI'
import {
    Navbar,
    Jumbotron,
    Button,
    Grid,
    Row,
    Col
} from 'react-bootstrap';

export class Container extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };
    }

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
            width: '100%',
            height: '100%'
        }

        if (!this.props.loaded) {
            return <div> Loading... < /div>
        }
        return (
                <Map google = {this.props.google}>
                <Marker visible ={this.state.visible}/>
                </Map>
        )
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyCQxUvYPmq2t3cMSz0ulVZ4Wu4ZJwImNjA"
})(Container)