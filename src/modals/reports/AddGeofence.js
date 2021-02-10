import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Card, Row, Col, Form, Accordion, Image } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'
import AddArea from '../reports/AddArea';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


class AddGeofence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNotificationFunc: props.addNotificationFunc,
            open: true,
            calenderList: [],
            selectedEdit: {},
            geofenceData: props.EditGeofence ? props.EditGeofence : {},
            isEdit: Object.keys(props.EditGeofence).length === 0 ? false : true,
            addAreaOpen: false
        }
    }

    componentWillMount() {
        this.getCalendars();
    }
    

    getCalendars() {
        commonServices.getCalendars((res) => {
            this.setState({ calenderList: res });
        })
    }

    handleChange = date => {
        this.setState({
            expirationTime: date
        });
    };

    addAreaFunc = (cb) => {
        this.state.geofenceData.area = cb
        this.setState({ addAreaOpen: !this.state.addAreaOpen })
    }


    componentWillReceiveProps(nextProps) {
        // this.setState({ addNotifcationOpen: nextProps.addNotifcationOpen });
    }

    onOpenModal = () => {
        this.setState({ addNotifcationOpen: true });
    };

    onCloseModal = () => {
        // this.setState({ addNotifcationOpen: false });
        this.props.addGeofenceFunc()
    };

    changeGeofenceDetailsValue(key, value) {
        let tempObj = this.state.geofenceData;
        tempObj[key] = value;
        this.setState({ geofenceData: tempObj });
    }

    setNotificators() {
        let tempObj = this.state.geofenceData;
        tempObj['notificators'] = this.state.webOrEmail.join(",");
        this.setState({ geofenceData: tempObj });
    }

    addGeofence = (event) => {
        // let tempObj = this.state.geofenceData;
        // tempObj[key] = value;
        // this.state.geofenceData.area = "surat";'
        commonServices.addGeofence(this.state.geofenceData, (res) => {
            this.onCloseModal()
        })
    }

    EditGeofenceFunc = (event) => {
        commonServices.geofenceEdit(this.state.geofenceData.id, this.state.geofenceData, (res) => {
            this.onCloseModal()
        })
    }


    render() {

        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup">
                        <div className="modal-name account-settings-name">
                            {this.state.isEdit ? <h6>Edit Geofence</h6> : <h6>Add Geofence</h6>}
                        </div>
                        <div className="modal-content account-settings-content">
                            <div className="account-wrapper">
                                <div className="account-info">
                                    <Form className="align-items-baseline">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Name
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="name" value={this.state.geofenceData.name} onChange={(val) => {
                                                    this.changeGeofenceDetailsValue('name', val.target.value)
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Description
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="description" value={this.state.geofenceData.description} onChange={(val) => {
                                                    this.changeGeofenceDetailsValue('description', val.target.value)
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        {/* <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Area
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control  type="text" name="area" value={this.state.geofenceData.area} onChange={(val) => {
                                                    this.changeGeofenceDetailsValue('area', val.target.value)
                                                }} />
                                            </Col>
                                        </Form.Group> */}
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                CalendarId
                                            </Form.Label>
                                            <Col sm="8">
                                                {/* <Form.Control type="number" name="calendarid" value={this.state.geofenceData.calendarId} placeholder="" onChange={(val) => {
                                                    this.changeGeofenceDetailsValue('calendarId', val.target.value)
                                                }} /> */}
                                                <select className="form-control" name="map" value={this.state.geofenceData.calendarId} onChange={(val) => {
                                                    this.changeGeofenceDetailsValue('calendarId', Number(val.target.value))
                                                }}>
                                                    <option value=""></option>
                                                    {
                                                        this.state.calenderList.map((list, index) => {
                                                            return <option key={index} value={list.id}>{list.name}</option>;
                                                        })
                                                    }
                                                    }
                                                </select>
                                            </Col>
                                        </Form.Group>

                                    </Form>
                                    <div className="button-wrapper d-flex align-content-center justify-content-between mt-2">
                                        <div className="button-action">
                                                <a href="#" className={"btn btn-danger btn-sm mr-2 "} onClick={() => this.setState({ addAreaOpen: true })}>Area</a>
                                        </div>
                                        <div className="generate-button">
                                            {this.state.isEdit ? <a href="#" className={"btn btn-primary btn-sm mr-2 " + (!this.state.geofenceData.area ? 'disabled' : '')} onClick={this.EditGeofenceFunc}>Edit</a> :
                                                <a href="#" className={"btn btn-primary btn-sm mr-2 " + (!this.state.geofenceData.area ? 'disabled' : '')} onClick={this.addGeofence}>Save</a>}
                                            <a href="#" className="btn btn-primary btn-sm" onClick={this.onCloseModal}>Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                {this.state.addAreaOpen && <AddArea addAreaFunc={this.addAreaFunc} EditArea={this.state.geofenceData} />}
            </div>
        );
    }
}

export default AddGeofence;