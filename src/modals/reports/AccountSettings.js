import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Card, Row, Col, Form, Accordion, Image } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


class AccountSettings extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            accountOpen: props.accountOpen,
            open: true,
            userData: JSON.parse(localStorage.getItem("userData"))
        }
    }

    handleChange = date => {
        this.setState({
            expirationTime: date
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ accountOpen: nextProps.accountOpen });
    }

    onOpenModal = () => {
        this.setState({ accountOpen: true });
    };

    onCloseModal = () => {
        // this.setState({ accountOpen: false });
        this.props.accountOpen();
    };

    changeAccountUserValue(key, value) {
        let tempObj = this.state.userData;
        tempObj[key] = value;
        this.setState({ userData: tempObj });
    }


    addUser = (event) => {
        let tempObj = this.state.userData;
        tempObj["token"] = 'HledCKxztBMF2UxK6RWt47Pp3jmZwMUo';
        this.setState({ userData: tempObj });
        commonServices.usersAdd(this.state.userData.id, this.state.userData, (res) => {
            localStorage.setItem('userData', JSON.stringify(res));
            this.onCloseModal()
        })
    }


    render() {

        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup">
                        <div className="modal-name account-settings-name">
                            <h6>Account</h6>
                        </div>
                        <div className="modal-content account-settings-content">
                            <div className="account-wrapper">
                                <div className="account-info">
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Name:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="name" value={this.state.userData.name} onChange={(val) => {
                                                   this.changeAccountUserValue('name', val.target.value)
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label column sm="4">
                                                Email:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="email" name="email" value={this.state.userData.email} onChange={(val) => {
                                                    this.changeAccountUserValue( 'email', val.target.value )
                                                }} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label column sm="4">
                                                Password:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="password" name="password" value={this.state.userData.password} onChange={(val) => {
                                                     this.changeAccountUserValue( 'password', val.target.value )
                                                }} />
                                            </Col>
                                        </Form.Group>
                                        {/* <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">
                                                Last Name:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">
                                                Company Name:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">
                                                Phone Number:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext" className="align-items-center">
                                            <Form.Label column sm="4">
                                                Administrator:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check type="checkbox" label="" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext" className="align-items-center">
                                            <Form.Label column sm="4">
                                                Manager:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check type="checkbox" label="" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext" className="align-items-center">
                                            <Form.Label column sm="4">
                                                Read Only:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check type="checkbox" label="" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">
                                                Expiration Date:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">
                                                Maximum number of devices:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">
                                                Email:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">
                                                Notifications:
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Event`}
                                                />

                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Went offline`}
                                                />

                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Enter geo-fence`}
                                                />

                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Exit geo-fence`}
                                                />

                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Maintenance required`}
                                                />

                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Overspeed`}
                                                />

                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Stopped`}
                                                />

                                                <Form.Check
                                                    
                                                    type="checkbox"
                                                    label={`Moving`}
                                                />

                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintexttext">
                                            <Form.Label column sm="4">


                                            </Form.Label>
                                            <Col sm="8">
                                                <div className="button-wrapper">
                                                    <a href="#" className="btn btn-default" onClick={this.addUser}>Save</a>
                                                    <a href="#" className="btn btn-default">Cancel</a>
                                                </div>
                                            </Col>
                                        </Form.Group> */}
                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Preferences
                                                    </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>

                                                        {/* <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Phone
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Control type="text" name="phone" value={this.state.userData.phone} onChange={(val) => {
                                                                    this.setState({ phone: val.target.value })
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group> */}

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Map Layer
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <select className="form-control" name="map" value={this.state.userData.map} onChange={(val) => {
                                                                    this.changeAccountUserValue('map', val.target.value )
                                                                }}>
                                                                    <option value=""></option>
                                                                    <option value="carto">Carto Basemaps</option>
                                                                    <option value="osm">Open Street Map</option>
                                                                    <option value="bingRoad">Bing Maps Road</option>
                                                                    <option value="bingAerial">Bing Maps Aerial</option>
                                                                    <option value="bingHybrid">Bing Maps Hybrid</option>
                                                                    <option value="Baidu">Baidu</option>
                                                                    <option value="yandexMap">Yandex Map</option>
                                                                    <option value="yandexSat">Yandex Satellite</option>
                                                                    <option value="wikimedia">Wikimedia</option>
                                                                    <option value="custom">Custom (XYZ)</option>
                                                                    <option value="customArcgis">Custom (ArcGIS)</option>
                                                                </select>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Latitude
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Control type="number" name="Latitude" value={this.state.userData.latitude} onChange={(val) => {
                                                                   this.changeAccountUserValue('latitude', val.target.value )
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Longitude
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Control type="number" name="Longitude" value={this.state.userData.longitude} onChange={(val) => {
                                                                    this.changeAccountUserValue('longitude', val.target.value )
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Zoom
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Control type="number" name="Zoom" value={this.state.userData.zoom} onChange={(val) => {
                                                                    this.changeAccountUserValue('zoom', val.target.value )
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                12-hour Format
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Check type="checkbox" label="" checked={this.state.userData.twelveHourFormat} onChange={(val) => {
                                                                    this.changeAccountUserValue('twelveHourFormat', val.target.checked )
                                                                }} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Coordinates Format
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <select className="form-control" value={this.state.userData.coordinateFormat} onChange={(val) => {
                                                                    this.changeAccountUserValue('coordinateFormat', val.target.value )
                                                                }}>
                                                                    <option value=""></option>
                                                                    <option value="dd">Decimal Degrees</option>
                                                                    <option value="ddm">Degrees Decimal Minutes</option>
                                                                    <option value="dms">Degrees Minutes Seconds</option>

                                                                </select>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                POI Layer
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Check type="text" name="poiLayer" checked={this.state.userData.poiLayer} onChange={(val) => {
                                                                    this.changeAccountUserValue('poiLayer', val.target.checked )
                                                                }} />
                                                            </Col>
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>

                                        </Accordion>

                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Permissions
                                                    </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Disabled
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Check type="checkbox" checked={this.state.userData.disabled} label="" onChange={(val) => {
                                                                    this.changeAccountUserValue('disabled', val.target.checked )
                                                                }} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Admin
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Check type="checkbox" label="" checked={this.state.userData.administrator} onChange={(val) => {
                                                                    this.changeAccountUserValue('administrator', val.target.checked )
                                                                }} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Readonly
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Check type="checkbox" label="" checked={this.state.userData.readonly} onChange={(val) => {
                                                                     this.changeAccountUserValue('readonly', val.target.checked ) 
                                                                }} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Device Readonly
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Check type="checkbox" label="" checked={this.state.userData.deviceReadonly} onChange={(val) => {
                                                                    this.changeAccountUserValue('deviceReadonly', val.target.checked ) 
                                                                }} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Limit Commands
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Check type="checkbox" label="" checked={this.state.userData.limitCommands} onChange={(val) => {
                                                                    this.changeAccountUserValue('limitCommands', val.target.checked ) 
                                                                }} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Expiration
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <DatePicker
                                                                    selected={this.state.userData.expirationTime}
                                                                    onChange={this.handleChange}
                                                                    className="form-control"
                                                                    showClearButton={true}
                                                                    clearButtonElement="x"
                                                                />

                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Device Limit
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Control type="number" name="deviceLimit" value={this.state.userData.deviceLimit} onChange={(val) => {
                                                                    this.changeAccountUserValue('deviceLimit', val.target.value )
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                User Limit
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Control type="number" name="userLimit" value={this.state.userData.userLimit} onChange={(val) => {
                                                                   this.changeAccountUserValue('userLimit', val.target.value )
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Token
                                                                    </Form.Label>
                                                            <Col sm="8">
                                                                <Form.Control type="text" name="token" disabled placeholder="" />
                                                            </Col>
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>

                                        </Accordion>
                                    </Form>
                                    <div className="button-wrapper d-flex align-content-center justify-content-between mt-2">
                                        <div className="button-action">

                                        </div>
                                        <div className="generate-button">
                                            <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addUser}>Save</a>
                                            <a href="#" className="btn btn-primary btn-sm">Cancel</a>
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

export default AccountSettings;