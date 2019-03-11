import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Form,Col,Row,Label,Button} from 'react-bootstrap';
import MapView from './MapView';

class Propose extends React.Component {

    state = {center:{lat: 19.7679,lng: 78.8718},coords:[{lat:19.93529,lng:85.49818}],zoom: 6,state:'Andhra Pradesh', district:'Guntur',pincode:'522601'}

    onFormSubmit(event){   
        console.log('******')
        console.log(event);
        console.log('******')
        setTimeout(10000,()=>{})
    }

    render() {    
    return (
        <div style={{marginTop:'20px',marginLeft:'20px'}}>
            <Form onSubmit={e => this.onFormSubmit(e)}>
            <Row >
                <Col>
                    < Form.Label>State name:</Form.Label>
                    <Form.Control placeholder="State name" />
                </Col>
                <Col>
                <Form.Label>City name:</Form.Label>
                    <Form.Control placeholder="City name" />
                </Col>
                <Col>
                <Form.Label>Pin code:</Form.Label>
                    <Form.Control placeholder="Pincode" />
                </Col>
                <Col>
                <Button type="submit" style={{marginTop:'30px'}}> Find</Button>
                </Col>
            </Row>
            </Form>
            <div style={{marginTop:'50px',marginRight:'10px'}}>
                <MapView coords={this.state.coords} center={this.state.center} zoom={this.state.zoom}/>
            </div>
            
        </div>
        
    )

}
}

export default withRouter(Propose);