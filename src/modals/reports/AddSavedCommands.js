import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Card, Row, Col, Form, Accordion, Image } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import commonData from "../../components/commonData";
import Timezone from "../../TimeZone";

class AddSavedCommands extends Component {
    constructor(props) {
        super(props);
        this.commandsList = commonData.savedCommandsList;
        this.state = {
            addNotificationFunc: props.addNotificationFunc,
            open: true,
            calenderList: [],
            savedCommandsData: props.EditSavedCommands ? props.EditSavedCommands : {},
            isEdit: Object.keys(props.EditSavedCommands).length === 0 ? false : true,
            frequencyType: 'seconds'
        }
        this.state.savedCommandsData['attributes'] = props.EditSavedCommands.attributes ? props.EditSavedCommands.attributes : {};
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

    componentWillReceiveProps(nextProps) {
        // this.setState({ addNotifcationOpen: nextProps.addNotifcationOpen });
    }

    onOpenModal = () => {
        this.setState({ addNotifcationOpen: true });
    };

    onCloseModal = () => {
        // this.setState({ addNotifcationOpen: false });
        this.props.addSavedCommandsFunc()
    };

    changeSavedCommandsDetailsValue(key, value) {
        let tempObj = this.state.savedCommandsData;
        tempObj[key] = value;
        this.setState({ savedCommandsData: tempObj });
    }

    changeSavedCommandsDetailsAttributesValue(key, value) {
        let tempObj = this.state.savedCommandsData;
        key ? tempObj.attributes[key] = value : tempObj.attributes = {};
        this.setState({ savedCommandsData: tempObj });
    }

    convertToSeconds(type, data) {
        // if(!data) return null;
        let customData = Number(data);
        if (type === "minutes") return customData * 60;
        else if (type === "hours") return customData * 60 * 60;
        else return customData;
    }

    setNotificators() {
        let tempObj = this.state.savedCommandsData;
        tempObj['notificators'] = this.state.webOrEmail.join(",");
        this.setState({ savedCommandsData: tempObj });
    }

    checkInnerObjects() {
        if (this.state.savedCommandsData.type === "deviceIdentification")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "positionSingle")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "positionPeriodic")
            this.changeSavedCommandsDetailsAttributesValue("frequency", this.convertToSeconds(this.state.frequencyType, this.state.savedCommandsData.attributes.frequency));
        else if (this.state.savedCommandsData.type === "positionStop")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "engineStop")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "engineResume")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "alarmArm")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "alarmDisarm")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "requestPhoto")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "powerOff")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
        else if (this.state.savedCommandsData.type === "rebootDevice")
            this.changeSavedCommandsDetailsAttributesValue(false, {});
    }

    addSavedCommands = (event) => {
        this.checkInnerObjects();
        commonServices.addSavedCommands(this.state.savedCommandsData, (res) => {
            this.onCloseModal()
        })
    }

    EditSavedCommandsFunc = (event) => {
        this.checkInnerObjects();
        commonServices.savedCommandsEdit(this.state.savedCommandsData.id, this.state.savedCommandsData, (res) => {
            this.onCloseModal()
        })
    }


    render() {

        const TimeZones = Timezone.map((item, key) => 
            <option key={item} value={key}>{item}</option>
        );
        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup">
                        <div className="modal-name account-settings-name">
                            {this.state.isEdit ? <h6>Edit Saved Commands</h6> : <h6>Add Saved Commands</h6>}
                        </div>
                        <div className="modal-content account-settings-content">
                            <div className="account-wrapper">
                                <div className="account-info">
                                    <Form className="align-items-baseline">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Description
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="description" value={this.state.savedCommandsData.description} onChange={(val) => {
                                                    this.changeSavedCommandsDetailsValue('description', val.target.value)
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Send SMS
                                                </Form.Label>
                                            <Col sm="8">
                                                {/* <Form.Control type="text" name="textChannel" value={this.state.savedCommandsData.textChannel} onChange={(val) => {
                                                    this.changeSavedCommandsDetailsValue('textChannel',val.target.value)
                                                }}/> */}
                                                <Form.Check type="checkbox" label="" checked={this.state.savedCommandsData.textChannel} onChange={(val) => {
                                                    this.changeSavedCommandsDetailsValue('textChannel', val.target.checked)
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Type
                                                </Form.Label>
                                            <Col sm="8">
                                                {/* <Form.Control type="text" name="type" value={this.state.savedCommandsData.type} onChange={(val) => {
                                                    this.changeSavedCommandsDetailsValue('type',val.target.value)
                                                }} /> */}
                                                <select className="form-control" name="map" value={this.state.savedCommandsData.type} onChange={(val) => {
                                                    this.changeSavedCommandsDetailsAttributesValue(false, null);
                                                    this.changeSavedCommandsDetailsValue('type', val.target.value);
                                                }}>
                                                    <option value=""></option>
                                                    {
                                                        Object.keys(this.commandsList).map((key, index) => {
                                                            return <option key={index} value={key}>{this.commandsList[key]}</option>;
                                                        })
                                                    }
                                                </select>
                                            </Col>
                                        </Form.Group>

                                        {this.state.savedCommandsData.type === "custom" ?
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }

                                        {this.state.savedCommandsData.type === "positionPeriodic" ?
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Frequency
                                                    </Form.Label>
                                                <Col sm="4">
                                                    <Form.Control type="number" name="data" value={this.state.savedCommandsData.attributes && this.state.savedCommandsData.attributes.frequency ? this.state.savedCommandsData.attributes.frequency : 0} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('frequency', val.target.value);
                                                    }} />
                                                </Col>
                                                <Col sm="4">
                                                    <select className="form-control" name="frequencyType" value={this.state.frequencyType} onChange={(val) => {
                                                        this.setState({ frequencyType: val.target.value })
                                                        // this.changeSavedCommandsDetailsAttributesValue('frequency', this.convertToSeconds(val.target.value, this.state.savedCommandsData.attributes.frequency ? this.state.savedCommandsData.attributes.frequency : 0))
                                                    }}>
                                                        <option key="0" value="seconds">s</option>
                                                        <option key="1" value="minutes">m</option>
                                                        <option key="2" value="hours">h</option>
                                                        {/* {
                                                            Object.keys(this.commandsList).map((key, index) => {
                                                                return <option key={index} value={key}>{this.commandsList[key]}</option>;
                                                            })
                                                        } */}
                                                    </select>
                                                </Col>
                                            </Form.Group> : null
                                        }

                                        {this.state.savedCommandsData.type === "setTimezone" ?
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Timezone Offset
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <select className="form-control" name="map" value={this.state.frequencyType} onChange={(val) => {
                                                        this.setState({ frequencyType: val.target.value })
                                                        // this.changeSavedCommandsDetailsAttributesValue('frequency', this.convertToSeconds(val.target.value, this.state.savedCommandsData.attributes.frequency ? this.state.savedCommandsData.attributes.frequency : 0))
                                                    }}>
                                                        {TimeZones}
                                                        {/* {
                                                            Object.keys(this.commandsList).map((key, index) => {
                                                                return <option key={index} value={key}>{this.commandsList[key]}</option>;
                                                            })
                                                        } */}
                                                    </select>
                                                </Col>
                                            </Form.Group> : null
                                        }

                                        {this.state.savedCommandsData.type === "sendSms" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Phone Number
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="phone" value={this.state.savedCommandsData.attributes.phone} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('phone', val.target.value)
                                                    }} />
                                                </Col>
                                                <Form.Label column sm="4">
                                                    Message
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="message" value={this.state.savedCommandsData.attributes.message} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('message', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "sendUssd" ?
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Phone Number
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="phone" value={this.state.savedCommandsData.attributes.phone} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('phone', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "sosNumber" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Index
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="number" name="index" value={this.state.savedCommandsData.attributes.index} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('index', val.target.value)
                                                    }} />
                                                </Col>
                                                <Form.Label column sm="4">
                                                    Phone Number
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="phone" value={this.state.savedCommandsData.attributes.phone} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('phone', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "silenceTime" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "setPhonebook" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "message" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Message
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="message" value={this.state.savedCommandsData.attributes.message} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('message', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "voiceMessage" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "outputControl" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Index
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="number" name="index" value={this.state.savedCommandsData.attributes.index} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('index', val.target.value)
                                                    }} />
                                                </Col>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "voiceMonitoring" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "setAgps" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "setIndicator" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "configuration" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "setConnection" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Server
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="server" value={this.state.savedCommandsData.attributes.server} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('server', val.target.value)
                                                    }} />
                                                </Col>
                                                <Form.Label column sm="4">
                                                    Port
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="number" name="port" value={this.state.savedCommandsData.attributes.port} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('port', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "setOdometer" ?
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "modePowerSaving" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "modeDeepSleep" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "movementAlarm" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Radius
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="number" name="radius" value={this.state.savedCommandsData.attributes.radius} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('radius', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "alarmBattery" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "alarmSos" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "alarmRemove" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "alarmClock" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "alarmSpeed" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "alarmFall" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Enable
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Check type="checkbox" label="" name="enable" checked={this.state.savedCommandsData.attributes.enable} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('enable', val.target.checked)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                                        {this.state.savedCommandsData.type === "alarmVibration" ? 
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">
                                                    Data
                                                    </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control type="text" name="data" value={this.state.savedCommandsData.attributes.data} onChange={(val) => {
                                                        this.changeSavedCommandsDetailsAttributesValue('data', val.target.value)
                                                    }} />
                                                </Col>
                                            </Form.Group> : null
                                        }
                            
                                    </Form>
                                    <div className="button-wrapper d-flex align-content-center justify-content-between mt-2">
                                        <div className="button-action">

                                        </div>
                                        <div className="generate-button">
                                            {this.state.isEdit ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.EditSavedCommandsFunc}>Edit</a> :
                                                <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addSavedCommands}>Save</a>}
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

export default AddSavedCommands;