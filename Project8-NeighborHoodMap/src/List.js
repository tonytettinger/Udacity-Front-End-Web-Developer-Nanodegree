import React, {
    Component
} from 'react';
import {
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

export class List extends React.Component {
        state = {
            venue: false
        }
        render() {
                return ( 
                <ListGroup>
                    {this.props.venues.map(venue =>
                            <ListGroupItem key = {venue}
                            eventKey = {venue}
                            active = {this.props.active[this.props.getIndex(venue)]}> {venue}
                            </ListGroupItem>)
                    } 
                </ListGroup>
                        )
        }
        }

export default List