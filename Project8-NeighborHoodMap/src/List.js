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