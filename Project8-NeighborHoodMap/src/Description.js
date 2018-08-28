import React, {
    Component
} from 'react';

import {
    FormGroup, Col, Panel, Radio
} from 'react-bootstrap';

export class Description extends React.Component {
    render() {
        return(
            <div>
            <article>
                <h3>Restaurants Dowtown San Francisco</h3>
                <div>
                    Venues information is provided by FourSquare and the Map by Google.
                    Items can be filtered with the dropdown menu above, based on venue type.
                    Location information can be accessed directly clicking on the markers or on the list panel.

                    This page has been prepared as a final project for the Udacity FEND degree.
                </div>
            </article>
             </div>
        )
    }
        
}

export default Description