import React, {
    Component
} from 'react';
 import {
     DropdownButton,
     MenuItem,
 } from 'react-bootstrap';
 
 export class Dropdown extends React.Component {
 
    render(){
        return(
    <DropdownButton bsSize="large" title = {'Places to eat'} >
    {this.props.venues.map(venue =>
        <MenuItem eventKey = {venue}
    active = "true" onSelect={this.props.callVisibility}> {venue} </MenuItem>)}
     </DropdownButton>
     )
}
    }

    export default Dropdown