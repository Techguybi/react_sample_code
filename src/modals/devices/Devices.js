import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form, Card, Accordion } from 'react-bootstrap';
import { deviceServices } from '../../components/redux/services/deviceServices'
import { commonServices } from '../../components/redux/services/commonServices'

const deviceData = {
    name: '',
    uniqueId: '',
    groupId: '',
    phone: '',
    model: '',
    contact: '',
    category: '',
    disabled: ''
}

class Devices extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            deviceOpen: props.deviceOpen,
            allgrpData: [],
            groupSelectItem: [],
            open: true,
            EditDevice: props.EditDevice,
            name: props.EditDevice.length != 0 ? props.EditDevice.name : '',
            uniqueId: props.EditDevice.length != 0 ? props.EditDevice.uniqueId : '',
            groupId: props.EditDevice.length != 0 ? props.EditDevice.groupId : 0,
            phone: props.EditDevice.length != 0 ? props.EditDevice.phone : '',
            model: props.EditDevice.length != 0 ? props.EditDevice.model : '',
            contact: props.EditDevice.length != 0 ? props.EditDevice.contact : '',
            category: props.EditDevice.length != 0 ? props.EditDevice.category : '',
            disabled: props.EditDevice.length != 0 ? props.EditDevice.disabled : false
        }
    }

    componentDidMount() {
        this.getAllGroup()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ deviceOpen: nextProps.deviceOpen });
    }

    getAllGroup = () => {
        commonServices.groupsDisplay((res) => {
            this.setState({ allgrpData: res })
        })
    }

    onOpenModal = () => {
        this.setState({ deviceOpen: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
        this.props.deviceOpen()
    };

    addDevice = (event) => {
        const deviceData = {
            name: this.state.name,
            uniqueId: this.state.uniqueId,
            groupId: this.state.groupId == undefined ? 0 : this.state.groupId,
            phone: this.state.phone,
            model: this.state.model,
            contact: this.state.contact,
            category: this.state.category,
            disabled: this.state.disabled,
            attributes: {},
            positionId: 0,
            geofenceIds: [],
        }
        
        deviceServices.devicesAction(deviceData, (res) => {
            this.onCloseModal()
        })
    }

    EditDevice = (event) => {
        const deviceData = {
            id : this.state.EditDevice.id,
            name: this.state.name,
            uniqueId: this.state.uniqueId,
            groupId: this.state.groupId.length == 0 ? 0 : this.state.groupId,
            phone: this.state.phone,
            model: this.state.model,
            contact: this.state.contact,
            category: this.state.category,
            disabled: this.state.disabled,
            attributes: {},
            positionId: 0,
            geofenceIds: [],
            lastUpdate: new Date().toISOString()
        }
        
        deviceServices.devicesEdit( this.state.EditDevice.id, deviceData, (res) => {
            
            this.onCloseModal()
        })
    }

    selectGroup = (e) => {
        // this.setState({ groupSelectItem: this.state.allgrpData[e.target.value] })
        this.setState({ groupId: e.target.value })
    }


    render() {
        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Device</h6>
                        </div>
                        <div className="modal-content">

                            <div className="report-info">
                                <Form onSubmit={this.addDevice}>
                                    <Row>
                                        <Col>
                                            <div className="report-content">
                                                <Card>
                                                    <Card.Header>Required</Card.Header>
                                                    <Card.Body>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Name
                                                            </Form.Label>
                                                            <Col sm="6">
                                                                <Form.Control type="text" name="name" value={this.state.name} onChange={(val) => {
                                                                    this.setState({ name: val.target.value })
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Identifier
                                                            </Form.Label>
                                                            <Col sm="6">
                                                                <Form.Control type="text" name="identifier" value={this.state.uniqueId} onChange={(val) => {
                                                                    this.setState({ uniqueId: val.target.value })
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                    </Card.Body>
                                                </Card>
                                                <Accordion >
                                                    <Card>
                                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                                            Extra
                                                    </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Card.Body>

                                                                <Form.Group as={Row}>
                                                                    <Form.Label column sm="4">
                                                                        Group
                                                                    </Form.Label>
                                                                    <Col sm="6">
                                                                        <select className="form-control" value={this.state.groupId} onChange={this.selectGroup}>
                                                                            <option value=""></option>
                                                                            {
                                                                                this.state.allgrpData.map((list, index) => {
                                                                                    return <option key={index} value={list.id}>{list.name}</option>;
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row}>
                                                                    <Form.Label column sm="4">
                                                                        Phone
                                                                    </Form.Label>
                                                                    <Col sm="6">
                                                                        <Form.Control type="text" name="phone" value={this.state.phone} onChange={(val) => {
                                                                    this.setState({ phone: val.target.value })
                                                                }} placeholder="" />
                                                                    </Col>
                                                                </Form.Group>


                                                                <Form.Group as={Row}>
                                                                    <Form.Label column sm="4">
                                                                        Model
                                                                    </Form.Label>
                                                                    <Col sm="6">
                                                                        <Form.Control type="text" name="Model" value={this.state.model} onChange={(val) => {
                                                                    this.setState({ model: val.target.value })
                                                                }} placeholder="" />
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row}>
                                                                    <Form.Label column sm="4">
                                                                        Contact
                                                                    </Form.Label>
                                                                    <Col sm="6">
                                                                        <Form.Control type="text" name="contact" value={this.state.contact} onChange={(val) => {
                                                                    this.setState({ contact: val.target.value })
                                                                }}  placeholder="" />
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row}>
                                                                    <Form.Label column sm="4">
                                                                        Categoty
                                                                    </Form.Label>
                                                                    <Col sm="6">
                                                                        <Form.Control type="text" name="categoty" value={this.state.category} onChange={(val) => {
                                                                    this.setState({ category: val.target.value })
                                                                }} placeholder="" />
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row}>
                                                                    <Form.Label column sm="4">
                                                                        Disabled
                                                                    </Form.Label>
                                                                    <Col sm="6">
                                                                        <Form.Check type="checkbox" label="" checked={this.state.disabled} />
                                                                    </Col>
                                                                </Form.Group>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>

                                                </Accordion>

                                            </div>
                                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                                <div className="button-action">

                                                </div>
                                                <div className="generate-button">
                                                    {/* <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addDevice}>Add</a> */}
                                                    {
                                                        Object.keys(this.state.EditDevice).length == 0 ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addDevice}>Add</a> :
                                                            <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.EditDevice}>Edit</a>
                                                    }
                                                    <a href="#" className="btn btn-primary btn-sm">Cancel</a>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>

                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Devices;