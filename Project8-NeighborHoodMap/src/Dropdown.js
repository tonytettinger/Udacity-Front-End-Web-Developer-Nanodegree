import React, {
    Component
} from 'react';
 import {
     DropdownButton,
     MenuItem,
 } from 'react-bootstrap';
 
 export class Dropdown extends React.Component {
    state = {
        venue : false
    }
    render(){
        return(
    < DropdownButton bsSize = "large"
    title = {
        'Select places to eat and drink'
    }
    id = {'PlacesToEat'}>
    {this.props.venues.map(venue =>
        <MenuItem key={venue} eventKey = {venue} active={this.props.active[this.props.getIndex(venue)]}
    onSelect={this.props.callVisibility}> {venue} </MenuItem>)}
     </DropdownButton>
     )
}
    }

    export default Dropdown