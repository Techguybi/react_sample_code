import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form, Card, Accordion } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddGeofence from '../reports/AddGeofence';
import AddArea from '../reports/AddArea';
import { commonServices } from '../../components/redux/services/commonServices';


class Geofence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gfoOpen: true,
            startDate: new Date(),
            geofenceList:[],
            selectedEdit: {},
            geofenceSelectItem:[],
            addGeofenceOpen: false,
            addAreaOpen: false
        }
    }

    componentWillMount() {
        this.getAllGeofences();
    }

    getAllGeofences = () => {
        commonServices.getGeofence((res) => {
            this.setState({ geofenceList: res });
            this.setState({ selectedEdit: {} });
            // this.setState({ notificationSelectItem: [] });
        })
    }

    addGeofenceFunc = () => {
        this.getAllGeofences();
        this.setState({ addGeofenceOpen: !this.state.addGeofenceOpen })
    }

    addAreaFunc = (cb) => {
        this.setState({ addAreaOpen: !this.state.addAreaOpen })
    }

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.state.geofenceSelectItem = { id: _d.id }
    }

    deleteNotification = () => {
        commonServices.geofenceDelete(this.state.selectedEdit.id, (res) => {
            this.setState({ geofenceSelectItem: [] })
            this.getAllGeofences();
        })
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ gfoOpen: nextProps.gfoOpen });
    }

    onOpenModal = () => {
        this.setState({ gfoOpen: true });
    };

    onCloseModal = () => {
        this.setState({ gfoOpen: false });
    };


    render() {

        return (
            <div>
                <Modal open={this.state.gfoOpen} onClose={this.onCloseModal}>
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Geofences</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => this.setState({ addGeofenceOpen: true })}>Add</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ addGeofenceOpen: true })}>Edit</a>
                                    {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')}>Share</a> */}
                                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.deleteNotification()}>Remove</a>
                                    {/* <a href="#" className={"btn btn-danger btn-sm mr-2 "} onClick={() => this.setState({ addAreaOpen: true })}>Add Area</a> */}
                                </div>

                            </div>
                            <div className="report-info">
                                <div className="reports-table">
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.geofenceList.length > 0 ?
                                                this.state.geofenceList.map((list, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.name}</td>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.description}</td>
                                                        </tr>
                                                    )
                                                }) :
                                                <tr><td colSpan="2"> No Geofences </td></tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                {this.state.addGeofenceOpen && <AddGeofence addGeofenceFunc={this.addGeofenceFunc} EditGeofence={this.state.selectedEdit}/>}
                {this.state.addAreaOpen && <AddArea addAreaFunc={this.addAreaFunc}  EditArea={this.state.selectedEdit}/>}
            </div>
        );
    }
}

export default Geofence;