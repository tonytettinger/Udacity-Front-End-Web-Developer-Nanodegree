import React, {
    Component
} from 'react';
import {
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

export class ListVenues extends React.Component {

        render() {
            return ( <ListGroup> 
                <ListGroupItem header = "Restaurants found in area" > Provided by FourSquare < /ListGroupItem>
                    {this.props.activeMarkers.map(marker => 
                    <ListGroupItem bsStyle = 'info'
                        key = {
                            marker.position
                        }
                        onClick = {() => this.props.listClick(marker)}> {
                            marker.name
                        }
                    </ListGroupItem>
                    )} </ListGroup>
                )
            }
        }

        export default ListVenues