import React, { Component } from 'react';
import Map from '../src/Map.js';
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userProfileData: props.userProfileData
    }
  }

  render() {
    return (
      <div>
        <Map></Map>
      </div>
    );
  }
}


function mapStateToProps(state) {

  return {
    userProfileData: state.login.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)