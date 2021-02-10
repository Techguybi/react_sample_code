import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices';
import commonData from "../../components/commonData";


export class AddMaintenance extends Component {

    constructor(props) {
        super(props);
        this.maintenanceTypeList = commonData.maintenanceType;
        this.state = {
            maintenanceaddfunc: props.maintenanceaddfunc,
            open: true,
            MaintenanceData: props.EditMaintenance ? props.EditMaintenance : {},
            isEdit: Object.keys(props.EditMaintenance).length === 0 ? false : true
        }
    }

    addMaintenance = (event) => {
        commonServices.addMaintenance(this.state.MaintenanceData, (res) => {
            this.onCloseModal()
        })
    }

    EditMaintenance = (event) => {
        commonServices.editMaintenance(this.state.MaintenanceData.id, this.state.MaintenanceData, (res) => {
            this.onCloseModal()
        })
    }

    changeMaintenanceDetailsValue(key, value) {
        let tempObj = this.state.MaintenanceData;
        tempObj[key] = value;
        this.setState({ MaintenanceData: tempObj });
    }

    onOpenModal = () => {
        this.setState({ maintenanceaddfunc: true });
    };

    onCloseModal = () => {
        this.setState({ maintenanceaddfunc: false });
        this.props.maintenanceaddfunc()
    };

    render() {
        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup small-information">
                        <div className="modal-name">
                            <h6>Maintenance</h6>
                        </div>
                        <div className="modal-content">
                            <div className="report-info">
                                <Row>
                                    <Col>
                                        <div className="report-content">
                                            <Form>
                                                <Form.Group as={Row} >
                                                    <Form.Label column sm="4">
                                                        Name
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" placeholder="" value={this.state.MaintenanceData.name} onChange={(val) => {
                                                            this.changeMaintenanceDetailsValue('name', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} >
                                                    <Form.Label column sm="4">
                                                        Type
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <select className="form-control" name="map" value={this.state.MaintenanceData.type} onChange={(val) => {
                                                            this.changeMaintenanceDetailsValue('type', val.target.value);
                                                        }}>
                                                            <option value=""></option>
                                                            {
                                                                Object.keys(this.maintenanceTypeList).map((key, index) => {
                                                                    return <option key={index} value={key}>{this.maintenanceTypeList[key]}</option>;
                                                                })
                                                            }
                                                        </select>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} >
                                                    <Form.Label column sm="4">
                                                        Start
                                                    </Form.Label>
                                                    {this.state.MaintenanceData.type === "odometer" || this.state.MaintenanceData.type === "serviceOdometer" || this.state.MaintenanceData.type === "tripOdometer" ||
                                                        this.state.MaintenanceData.type === "distance" || this.state.MaintenanceData.type === "totalDistance" || this.state.MaintenanceData.type === "obdOdometer" ?
                                                        <Row>
                                                            <Col sm="10">
                                                                <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.start} onChange={(val) => {
                                                                    this.changeMaintenanceDetailsValue('start', val.target.value)
                                                                }} />
                                                            </Col>
                                                            <Col sm="1">
                                                                km
                                                            </Col>
                                                        </Row>
                                                        :
                                                        this.state.MaintenanceData.type === "obdSpeed" ?
                                                            <Row>
                                                                <Col sm="10">
                                                                    <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.start} onChange={(val) => {
                                                                        this.changeMaintenanceDetailsValue('start', val.target.value)
                                                                    }} />
                                                                </Col>
                                                                <Col sm="1">
                                                                    km/h
                                                            </Col>
                                                            </Row>
                                                            :
                                                            this.state.MaintenanceData.type === "hours" ?
                                                                <Row>
                                                                    <Col sm="10">
                                                                        <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.start} onChange={(val) => {
                                                                            this.changeMaintenanceDetailsValue('start', val.target.value)
                                                                        }} />
                                                                    </Col>
                                                                    <Col sm="1">
                                                                        h
                                                                    </Col>
                                                                </Row>
                                                            :
                                                            <Col sm="8">
                                                                <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.start} onChange={(val) => {
                                                                    this.changeMaintenanceDetailsValue('start', val.target.value)
                                                                }} />
                                                            </Col>
                                                    }
                                                    {/* <Col sm="8">
                                                        <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.start} onChange={(val) => {
                                                            this.changeMaintenanceDetailsValue('start', val.target.value)
                                                        }} />
                                                    </Col> */}
                                                </Form.Group>

                                                <Form.Group as={Row} >
                                                    <Form.Label column sm="4">
                                                        Period
                                                    </Form.Label>

                                                    {this.state.MaintenanceData.type === "odometer" || this.state.MaintenanceData.type === "serviceOdometer" || this.state.MaintenanceData.type === "tripOdometer" ||
                                                        this.state.MaintenanceData.type === "distance" || this.state.MaintenanceData.type === "totalDistance" || this.state.MaintenanceData.type === "obdOdometer" ?
                                                        <Row>
                                                            <Col sm="10">
                                                                <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.period} onChange={(val) => {
                                                                    this.changeMaintenanceDetailsValue('period', val.target.value)
                                                                }} />
                                                            </Col>
                                                            <Col sm="1">
                                                                km
                                                            </Col>
                                                        </Row>
                                                        :
                                                        this.state.MaintenanceData.type === "obdSpeed" ?
                                                            <Row>
                                                                <Col sm="10">
                                                                    <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.period} onChange={(val) => {
                                                                        this.changeMaintenanceDetailsValue('period', val.target.value)
                                                                    }} />
                                                                </Col>
                                                                <Col sm="1">
                                                                    km/h
                                                            </Col>
                                                            </Row>
                                                            : this.state.MaintenanceData.type === "hours" ?
                                                                <Row>
                                                                    <Col sm="10">
                                                                        <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.period} onChange={(val) => {
                                                                            this.changeMaintenanceDetailsValue('period', val.target.value)
                                                                        }} />
                                                                    </Col>
                                                                    <Col sm="1">
                                                                        h
                                                                    </Col>
                                                                </Row> :
                                                                <Col sm="8">
                                                                    <Form.Control type="number" placeholder="" value={this.state.MaintenanceData.period} onChange={(val) => {
                                                                        this.changeMaintenanceDetailsValue('period', val.target.value)
                                                                    }} />
                                                                </Col>
                                                    }
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <div className="button-wrapper d-flex align-content-center justify-content-between">
                                            <div className="button-action">

                                            </div>
                                            <div className="generate-button">
                                                {/* <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addCalendar}>Import</a> */}

                                                {this.state.isEdit ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.EditMaintenance}>Edit</a> :
                                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addMaintenance}>Save</a>}
                                                <a href="#" className="btn btn-primary btn-sm">Cancel</a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddMaintenance
