import React, { Component } from 'react';
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import Maintenance from './modals/reports/Maintenance'
import Drivers from './modals/reports/Drivers'
import MileageDetail from './modals/reports/MileageDetail'
import OverSpeeds from './modals/reports/OverSpeeds'
import GeoFenceInOut from './modals/reports/GeoFenceInOut'
import Events from './modals/reports/Events'
import Groups from './modals/reports/Groups'
import Calendar from './modals/reports/Calendar'
import Users from './modals/reports/Users'
import Server from './modals/reports/Server'
import Notifications from './modals/reports/Notifications'
import Prefrences from './modals/reports/Prefrences'
import ServiceWrapper from './modals/reports/ServiceWrapper'
import TrackerServer from './modals/reports/TrackerServer'
import Geofence from './modals/reports/Geofence'
import ComputedAttributes from './modals/reports/ComputedAttributes'
import SavedCommands from './modals/reports/SavedCommands'
import Modal from "react-responsive-modal";

const initialState = {
    maintenanceOpen: false,
    driversOpen: false,
    mdopen: false,
    osOpen: false,
    gfoOpen: false,
    eventOpen: false,
    groups: false,
    calendarOpen: false,
    usersOpen: false,
    serverOpen: false,
    notificationsOpen: false,
    prefrenceOpen: false,
    trackerServerLog: false,
    serviceWrapperLog: false,
    geofenceOpen: false,
    computedAttributesOpen: false,
    SavedCommandsOpen: false
};
class Actions extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }

    componentWillMount() {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData) document.location.href="/";
    }


    onOpenModal = () => {
        this.setState({ open: true });
    };


    render() {
        return (
            <div className="action-buttons d-flex">
                <Dropdown>
                    <Dropdown.Toggle variant="default" id="reports">
                        Reports
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ maintenanceOpen: true }) }}>Maintenance</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ driversOpen: true }) }}>Drivers</Dropdown.Item>
                        {/* <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ mdopen: true }) }}>Mileage detail</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ osOpen: true }) }}>Overspeeds</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ gfoOpen: true }) }}>Geo-fence In/Out</Dropdown.Item> */}
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ eventOpen: true }) }}>Events</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary"  onClick={() => { this.setState(initialState); this.setState({ groups: true }) }}>Groups</Button>
                <Dropdown>
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                        Settings
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ usersOpen: true }) }}>Users</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ serverOpen: true }) }}>Server</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ notificationsOpen: true }) }}>Notifications</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ prefrenceOpen: true }) }}>Default Prefrences</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ geofenceOpen: true }) }}>Geofence</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ computedAttributesOpen: true }) }}>Computed Attributes</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ SavedCommandsOpen: true }) }}>Saved Commands</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <Dropdown>
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                        Logs
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ trackerServerLog: true }) }}>Tracker Server Log</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => { this.setState(initialState); this.setState({ serviceWrapperLog: true }) }}>Service Wrapper Log</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <Button variant="primary"  onClick={() => { this.setState(initialState); this.setState({ calendarOpen: true }) }}>Calendar</Button>

                {this.state.maintenanceOpen && <Maintenance maintenanceOpen={this.state.maintenanceOpen} />}
                {this.state.driversOpen && <Drivers driversOpen={this.state.driversOpen} />}
                {this.state.mdopen && <MileageDetail mdopen={this.state.mdopen} />}
                {this.state.osOpen && <OverSpeeds osOpen={this.state.osOpen} />}
                {this.state.gfoOpen && <GeoFenceInOut gfoOpen={this.state.gfoOpen} />}
                {this.state.eventOpen && <Events eventOpen={this.state.eventOpen} />}
                {this.state.groups && <Groups groups={this.state.groups} />}
                {this.state.calendarOpen && <Calendar calendarOpen={this.state.calendarOpen} />}
                {this.state.usersOpen && <Users usersOpen={this.state.usersOpen} />}
                {this.state.serverOpen && <Server serverOpen={this.state.serverOpen} />}
                {this.state.notificationsOpen && <Notifications notificationsOpen={this.state.notificationsOpen} />}
                {this.state.prefrenceOpen && <Prefrences prefrenceOpen={this.state.prefrenceOpen} />}
                {this.state.trackerServerLog && <TrackerServer trackerServerLog={this.state.trackerServerLog} />}
                {this.state.serviceWrapperLog && <ServiceWrapper serviceWrapperLog={this.state.serviceWrapperLog} />}
                {this.state.geofenceOpen && <Geofence geofenceOpen={this.state.geofenceOpen} />}
                {this.state.computedAttributesOpen && <ComputedAttributes computedAttributesOpen={this.state.computedAttributesOpen} />}
                {this.state.SavedCommandsOpen && <SavedCommands SavedCommandsOpen={this.state.SavedCommandsOpen} />}
            </div>
        );
    }
}

export default Actions;