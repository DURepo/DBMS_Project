import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Form,Col,Row,Label} from 'react-bootstrap';
import MapView from './MapView';

class Propose extends React.Component {

    state = {center:{lat: 19.7679,lng: 78.8718},coords:[{lat:19.93529,lng:85.49818}],zoom: 6}

    render() {    
    return (
        <div style={{marginTop:'20px',marginLeft:'10px'}}>
            <div className="form-group row" >
                <div className="col-sm-2">
                    < Form.Label>State name:</Form.Label>
                    <Form.Control placeholder="State name" />
                </div>
                <div className="col-sm-2">
                <Form.Label>City name:</Form.Label>
                    <Form.Control placeholder="City name" />
                </div>
                <div className="col-sm-2">
                <Form.Label>Pin code:</Form.Label>
                    <Form.Control placeholder="Pincode" />
                </div>
            </div>
            <div style={{marginTop:'50px',marginLeft:'10px'}}>
                <MapView coords={this.state.coords} center={this.state.center} zoom={this.state.zoom}/>
            </div>
            
        </div>
        
    )

}
}

export default withRouter(Propose);