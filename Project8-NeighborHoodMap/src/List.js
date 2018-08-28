import React, {
    Component
} from 'react';
import {
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

export class List extends React.Component {

        render() {
                return ( 
                <ListGroup>
                    <
                    ListGroupItem header = "Click on venue type to show those type of venue's markers bouncing on the map" > (Available selections showing: Dark blue) < /ListGroupItem>
                    {this.props.venues.map(venue =>
                   
                            < ListGroupItem bsStyle = {
                                    `${this.props.style[this.props.getIndex(venue)]}`
                            }
                            key = {venue}
                            onClick = {
                                () => this.props.toggleMarkers(venue)
                            }
                            active = {this.props.active[this.props.getIndex(venue)]}> {venue}
                            </ListGroupItem>)
                    } 
                </ListGroup>
                        )
        }
        }

export default List