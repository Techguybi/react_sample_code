import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'


export class AddDrivers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            driveraddfunc: props.driveraddfunc,
            open: true,
            driverData: props.EditDriver ? props.EditDriver : {},
            isEdit:  Object.keys(props.EditDriver).length === 0  ? false : true,
           // webOrEmail: props.EditDriver &&  props.EditDriver.drivers ? props.EditDriver.drivers.split(',') : [],
        }
    }


    // componentWillReceiveProps(nextProps) {
    //     this.setState({ DriverAddFunc: nextProps.DriverAddFunc });
    // }

    changeDriveDetailsValue(key, value) {
        let tempObj = this.state.driverData;
        tempObj[key] = value;
        this.setState({ driverData: tempObj });
    }

    onOpenModal = () => {
        this.setState({ DriverAddFunc: true });
    };

    onCloseModal = () => {
        //this.setState({ DriverAddFunc: false });
        this.props.driveraddfunc()
    };


    addDriver = (event) => {
        this.setDrivers();
        const driveData = {
            name: this.state.driverData.name,
            uniqueId: this.state.driverData.uniqueId,
        }
        commonServices.addDriver(driveData, (res) => {
            this.onCloseModal()
        })
    }

    EditDriverFunc = (event) =>{
        this.setDrivers();
        commonServices.driverEdit(this.state.driverData.id, this.state.driverData, (res) => {
            this.onCloseModal()
        })
    }

    setDrivers(){
        let tempObj = this.state.driverData;
        //tempObj['drivers'] =  this.state.webOrEmail.join(",");
        this.setState({ driverData: tempObj });
    }

    render() {
        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup small-information">
                        <div className="modal-name">
                            <h6>Driver</h6>
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
                                                        <Form.Control type="text" placeholder="" value={this.state.driverData.name} onChange={(val) => {
                                                            this.changeDriveDetailsValue('name', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} >
                                                    <Form.Label column sm="4">
                                                    Identifier
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" placeholder="" value={this.state.driverData.uniqueId} onChange={(val) => {
                                                            this.changeDriveDetailsValue('uniqueId', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <div className="button-wrapper d-flex align-content-center justify-content-between">
                                            <div className="button-action">

                                            </div>
                                            <div className="generate-button">
                                                {/* <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addCalendar}>Import</a> */}

                                                {this.state.isEdit ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.EditDriverFunc}>Edit</a> :
                                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addDriver}>Save</a>}
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

export default AddDrivers
