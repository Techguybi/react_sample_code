import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Card, Row, Col, Form, Accordion, Image } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


class AddNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNotificationFunc: props.addNotificationFunc,
            open: true,
            calenderList: [],
            notificationData: props.EditNotification ? props.EditNotification : {},
            webOrEmail: props.EditNotification &&  props.EditNotification.notificators ? props.EditNotification.notificators.split(',') : [],
            isEdit:  Object.keys(props.EditNotification).length === 0  ? false : true
        }
    }

    componentWillMount() {
        this.getCalendars();
    }

    getCalendars(){
        commonServices.getCalendars((res) => {
            this.setState({calenderList: res});
        })
    }

    handleChange = date => {
        this.setState({
            expirationTime: date
        });
    };

    componentWillReceiveProps(nextProps) {
        // this.setState({ addNotifcationOpen: nextProps.addNotifcationOpen });
    }

    onOpenModal = () => {
        this.setState({ addNotifcationOpen: true });
    };

    onCloseModal = () => {
        // this.setState({ addNotifcationOpen: false });
        this.props.addNotificationFunc()
    };

    changeNotificationDetailsValue(key, value) {
        let tempObj = this.state.notificationData;
        tempObj[key] = value;
        this.setState({ notificationData: tempObj });
    }

    setNotificators(){
        let tempObj = this.state.notificationData;
        tempObj['notificators'] =  this.state.webOrEmail.join(",");
        this.setState({ notificationData: tempObj });
    }

    addNotification = (event) => {
        // let tempObj = this.state.notificationData;
        // tempObj[key] = value;
        // this.state.notificationData.id = 123;
        this.setNotificators();
        commonServices.addNotification(this.state.notificationData, (res) => {
            this.onCloseModal()
        })
    }

    EditNotificationFunc = (event) =>{
        this.setNotificators();
        commonServices.notificationEdit(this.state.notificationData.id, this.state.notificationData, (res) => {
            this.onCloseModal()
        })
    }


    render() {

        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup">
                        <div className="modal-name account-settings-name">
                            {this.state.isEdit ? <h6>Edit Notification</h6>:<h6>Add Notification</h6>}
                        </div>
                        <div className="modal-content account-settings-content">
                            <div className="account-wrapper">
                                <div className="account-info">
                                    <Form className="align-items-baseline">
                                        <Form.Group as={Row} controlId="">
                                            <Form.Label column sm="4">
                                                Type:
                                            </Form.Label>
                                            <Col sm="8">
                                                {/* <Form.Control type="text" value={this.state.notificationData.type} onChange={(val) => {
                                                    this.changeNotificationDetailsValue('type', val.target.value)
                                                }} /> */}
                                                <select className="form-control" name="map" value={this.state.notificationData.type} onChange={(val) => {
                                                            this.changeNotificationDetailsValue('type', val.target.value)
                                                        }}>
                                                    <option value=""></option>
                                                    <option value="geofenceExit">Geofence exited</option>
                                                    <option value="commandResult">Command result</option>
                                                    <option value="alarm">Alarm</option>
                                                    <option value="ignitionOff">Ignition off</option>
                                                    <option value="ignitionOn">Ignition on</option>
                                                    <option value="deviceUnknown">Status unknown</option>
                                                    <option value="deviceFuelDrop">Fule drop</option>
                                                    <option value="driverChanged">Driver changed</option>
                                                    <option value="textMessage">Text message received</option>
                                                    <option value="deviceOverspeed">Speed limit exceeded</option>
                                                    <option value="deviceOffline">Status offline</option>
                                                    <option value="deviceStopped">Device stopped</option>
                                                    <option value="deviceOnline">Status online</option>
                                                    <option value="geofenceEnter">Geofence entered</option>
                                                    <option value="deviceMoving">Device moving</option>
                                                    <option value="maintenance">Maintenance required</option>
                                                </select>
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row} controlId="" className="align-items-center">
                                            <Form.Label column sm="4">
                                                Always
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check type="checkbox" label="" checked={this.state.notificationData.always} onChange={(val) => {
                                                    this.changeNotificationDetailsValue('always', val.target.checked )
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="" className="align-items-center">
                                            <Form.Label column sm="4">
                                                Web
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check type="checkbox" label="" checked={this.state.notificationData.notificators && this.state.notificationData.notificators.indexOf("web") >= 0} onChange={(val) => {
                                                    // this.changeNotificationDetailsValue('web', val.target.checked)
                                                    if(val.target.checked){
                                                        this.state.webOrEmail.push("web")
                                                       this.setNotificators();
                                                    }
                                                    else{
                                                        this.state.webOrEmail.splice(this.state.webOrEmail.indexOf("web"),1);
                                                       this.setNotificators();
                                                    }
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="" className="align-items-center">
                                            <Form.Label column sm="4">
                                                Mail
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check type="checkbox" label="" checked={this.state.notificationData.notificators && this.state.notificationData.notificators.indexOf("mail") >= 0} onChange={(val) => {
                                                    // this.changeNotificationDetailsValue('mail', val.target.checked)
                                                    if(val.target.checked){
                                                        this.state.webOrEmail.push("mail")
                                                       this.setNotificators();
                                                    }else {
                                                        this.state.webOrEmail.splice(this.state.webOrEmail.indexOf("mail"),1);
                                                       this.setNotificators();
                                                    }
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        {/* <Form.Group as={Row} controlId="" className="align-items-center">
                                            <Form.Label column sm="4">
                                                SMS
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check type="checkbox" label="" checked={this.state.notificationData.sms} onChange={(val) => {
                                                    this.changeNotificationDetailsValue('sms', val.target.checked)
                                                }} />
                                            </Col>
                                        </Form.Group> */}

                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                CalendarId
                                            </Form.Label>
                                            <Col sm="8">
                                                {/* <Form.Control type="number" name="calendarid" value={this.state.notificationData.calendarId} placeholder="" onChange={(val) => {
                                                    this.changeNotificationDetailsValue('calendarId', val.target.value)
                                                }} /> */}
                                                <select className="form-control" name="map" value={this.state.notificationData.calendarId} onChange={(val) => {
                                                            this.changeNotificationDetailsValue('calendarId', Number(val.target.value))
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

                                        </div>
                                        <div className="generate-button">
                                            {this.state.isEdit ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.EditNotificationFunc}>Edit</a> :
                                            <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addNotification}>Save</a>}
                                            <a href="#" className="btn btn-primary btn-sm" onClick={this.onCloseModal}>Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddNotification;