import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Image } from 'react-bootstrap'
import Logo from './Logo';
import Actions from './Actions';
import Objects from './Objects';
import Archive from './Archive';
import Settings from './Settings';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11
  };

  constructor(props) {
    super(props);
    
    this.state = {
      bottomActive: false,
    }
}

  render() {
    return (
      // Important! Always set the container height explicitly
      <div>
      <div style={{ height: '100vh', width: '100%' }}>
      {/* <Image src="https://staticmapmaker.com/img/google@2x.png" rounded /> */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDJKkCEOzIqx1oq2O0U1R0Q8D2ANrPdpBU' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
       <div className="logo">
       <Logo></Logo>
     </div>
     <Actions></Actions>
     <Settings></Settings>
     <Objects></Objects>
     <Archive bottomActive={this.state.bottomActive}></Archive>
     </div>
    );
  }
}

export default Map;