import React, { useState, Component } from 'react';
import user from './assets/user.png';
import settings from './assets/settings.png';
import logout from './assets/logout.png';
import sideicon1 from './assets/sideicon1.png';
import sideicon2 from './assets/sideicon2.png';
import sideicon3 from './assets/sideicon3.png';
import sideicon4 from './assets/sideicon4.png';
import Prefrences from './modals/reports/Prefrences'
import AccountSettings from './modals/reports/AccountSettings'
import sideicon5 from './assets/sideicon5.png';

const initialState = {
    prefrenceOpen: false,
    accountOpen: false,
}

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    accountOpen = () => {
        this.setState({ accountOpen: !this.state.accountOpen })
    }

    doLogout = () =>{
        localStorage.clear();
        document.location.href="/";
    }


    render() {
    return (
        <div>
            <div className="settings-wrapper">
                <a href="#" onClick={() => { this.setState(initialState); this.setState({ accountOpen: true }) }}><img src={user} alt="user" /></a>
                <a href="#"  onClick={() => { this.setState(initialState); this.setState({ prefrenceOpen: true }) }}><img src={settings} alt="settings" /></a>
                <a href="#" onClick={this.doLogout}><img src={logout} alt="logout" /></a>
            </div>
            <div className="map-settings-wrapper">
                <a href="#"><img src={sideicon1} alt="sideicon1" /></a>
                <a href="#"><img src={sideicon2} alt="sideicon2" /></a>
                <a href="#"><img src={sideicon3} alt="sideicon3" /></a>
                <a href="#"><img src={sideicon4} alt="sideicon4" /></a>
                <a href="#"><img src={sideicon5} alt="sideicon5" /></a>
            </div>
            {this.state.prefrenceOpen && <Prefrences prefrenceOpen={this.state.prefrenceOpen} />}
            {this.state.accountOpen && <AccountSettings accountOpen={this.accountOpen} />}
        </div>
    );
                                        }
}

export default Settings;