import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import Layout from './Layout';
//import 'normalize.css/normalize.css';
//import './Main.sass';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapView extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'API KEY AVAILABLE IN WHATSAPP CHAT' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={19.93529}
            lng={85.49818}
            text={'Kordha '}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapView;
