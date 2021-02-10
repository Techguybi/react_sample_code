import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form, Tabs, Tab } from 'react-bootstrap';
import AddNotification from '../reports/AddNotification';
import { commonServices } from '../../components/redux/services/commonServices';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsOpen: props.notificationsOpen,
            notificationList:[],
            addNotifcationOpen: false,
            selectedEdit: {},
            notificationSelectItem:[]
        }
    }

    componentWillMount() {
        this.getAllNotifications();
    }

    getAllNotifications = () => {
        commonServices.getNotificaions((res) => {
            this.setState({ notificationList: res });
            this.setState({ selectedEdit: {} });
            this.setState({ notificationSelectItem: [] });
        })
    }

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.state.notificationSelectItem = { id: _d.id }
    }

    addNotificationFunc = () => {
        this.getAllNotifications();
        this.setState({ addNotifcationOpen: !this.state.addNotifcationOpen })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ notificationsOpen: nextProps.notificationsOpen });
    }

    onOpenModal = () => {
        this.setState({ notificationsOpen: true });
    };

    onCloseModal = () => {
        this.setState({ notificationsOpen: false });
    };

    checkType(type){
        if(type === "geofenceExit") return "Geofence exited";
        else if(type === "commandResult")   return "Command result";
        else if(type === "alarm") return  "Alarm";
        else if(type === "ignitionOff") return "Ignition off";
        else if(type === "ignitionOn")  return "Ignition on";
        else if(type === "deviceUnknown") return  "Status unknown";
        else if(type === "deviceFuelDrop") return "Fule drop";
        else if(type === "driverChanged") return "Driver changed";
        else if(type === "textMessage") return "Text message received";
        else if(type === "deviceOverspeed") return "Speed limit exceeded";
        else if(type === "deviceOffline") return "Status offline";
        else if(type === "deviceStopped") return "Device stopped";
        else if(type === "deviceOnline") return "Status online";
        else if(type === "geofenceEnter") return "Geofence entered";
        else if(type === "deviceMoving") return "Device moving";
        else if(type === "maintenance") return "Maintenance required";
    }

    deleteNotification = () => {
        commonServices.notificationDelete(this.state.selectedEdit.id, (res) => {
            // if (typeof (res) == "string") {
            //     alert(res)
            // } else {
                this.setState({ notificationSelectItem: [] })
                this.getAllNotifications();
            // }

        })
    }

    // EditGroup = (event) => {
    //     const grpData = {
    //         id: this.state.selectedEdit.id,
    //         name: this.state.groupename,
    //         groupId: this.state.notificationSelectItem == undefined ? 0 : this.state.notificationSelectItem.id
    //         //uniqueId: this.refs.deviceidentifier.value
    //     }
    //     commonServices.groupsEdit(this.state.selectedEdit.id, grpData, (res) => {
    //         if (typeof (res) == "string") {
    //             alert(res)
    //         } else {
    //             this.setState({ notificationSelectItem: [] })
    //             this.onCloseAddModal()
    //             this.getAllGroup()
    //         }

    //     })
    // }


    render() {

        return (
            <div>
                <Modal open={this.state.notificationsOpen} onClose={this.onCloseModal}>
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Notification settings</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => this.setState({ addNotifcationOpen: true })}>Add</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ addNotifcationOpen: true })}>Edit</a>
                                    {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')}>Share</a> */}
                                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.deleteNotification()}>Remove</a>
                                </div>

                            </div>
                            <div className="report-info">
                                <div className="reports-table">
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Type of Notification</th>
                                                <th>All devices</th>
                                                <th>Alarms</th>
                                                <th>Channels</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.notificationList.length > 0 ? 
                                                this.state.notificationList.map((list, index) => {
                                                    return (
                                                    <tr key={index}>
                                                        <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{this.checkType(list.type)}</td>
                                                        <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.always === true ? "Yes": "No"}</td>
                                                        <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}></td>
                                                        <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.notificators}</td>
                                                    </tr>
                                                    )
                                                }) :
                                                <tr><td colSpan="4"> No Notifications </td></tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal>
                {this.state.addNotifcationOpen && <AddNotification addNotificationFunc={this.addNotificationFunc} EditNotification={this.state.selectedEdit}/>}
            </div>
        );
    }
}

export default Notifications;