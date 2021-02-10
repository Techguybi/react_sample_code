import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class OverSpeeds extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            osOpen: props.osOpen,
            startDate: new Date()
        }
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ osOpen: nextProps.osOpen });
    }

    onOpenModal = () => {
        this.setState({ osOpen: true });
    };

    onCloseModal = () => {
        this.setState({ osOpen: false });
    };


    render() {

        return (
            <div>
                <Modal open={this.state.osOpen} onClose={this.onCloseModal} classNames="custom-modal-wrapper">
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Reports</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2">New</a>
                                    <a href="#" className="btn btn-success btn-sm mr-2">Save</a>
                                    <a href="#" className="btn btn-danger btn-sm mr-2" disabled>Remove</a>
                                </div>
                                <div className="generate-button">
                                    <a href="#" className="btn btn-primary btn-sm">Generate</a>
                                </div>
                            </div>
                            <div className="reports-table">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </Table>
                            </div>
                            <div className="report-info">
                                <Row>
                                    <Col sm={6}>
                                        <div className="title-name">
                                            <h5>Report</h5>
                                        </div>
                                        <div className="report-content">
                                            <Form>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="4">
                                                        Type
                                                    </Form.Label>
                                                    <Col sm="8">
                                                    <Form.Control type="text" placeholder="Over Speeds" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Password
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="default" id="reports">
                                                                Over Speeds
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1" onClick={this.onOpenModal}>General Information</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Drives and stops</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">Mileage detail</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">O</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">Geo-fence In/Out</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">Events</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="6">
                                                    {['checkbox'].map(type => (
                                                        <div key={`custom-${type}`} className="mb-2">
                                                        <Form.Check 
                                                            custom
                                                            type={type}
                                                            id={`custom-${type}`}
                                                            label={`Include map`}
                                                        />
                                                        <Form.Check 
                                                            custom
                                                            type={type}
                                                            id={`custom-${type}`}
                                                            label={`Disable filter`}
                                                        />
                                                        <Form.Check 
                                                            custom
                                                            type={type}
                                                            id={`custom-${type}`}
                                                            label={`Preview`}
                                                        />
                                                        </div>
                                                    ))}
                                                    </Form.Label>
                                                    <Col sm="6">
                                                    
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Col>
                                    <Col sm>
                                        <div className="title-name">
                                            <h5>Devices</h5>
                                        </div>
                                    </Col>
                                    <Col sm>
                                        <div className="title-name">
                                            <h5>Geo-fences</h5>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm>
                                        <div className="time-period">
                                            <div className="title-name">
                                                <h5>Time Period</h5>
                                            </div>
                                            <div className="report-content">
                                                <Form>
                                                    <Form.Group as={Row} className="mb-0">
                                                        <Col sm="2">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="default" id="reports">
                                                                    Today
                                                            </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#/action-1" onClick={this.onOpenModal}>Today</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-2">Yesterday</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">This week</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">Previous week</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">This month</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">Previous month</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">Custom</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Col>

                                                        <Col sm="4">
                                                            <div className="d-flex align-items-center">
                                                            <Form.Label className="mr-1"> Form: </Form.Label>
                                                            <div className="date-wrapper">
                                                            <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChange}
                                                                className="form-control"
                                                            />
                                                            <i className="fa fa-calendar"></i>
                                                            </div>
                                                            </div>
                                                        </Col>

                                                        <Col sm="2">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="default" id="reports">
                                                                    Today
                                                            </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#/action-1" onClick={this.onOpenModal}>Today</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-2">Yesterday</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">This week</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">Previous week</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">This month</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">Previous month</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3">Custom</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Col>
                                                        <Col sm="4">
                                                        <div className="d-flex align-items-center">
                                                            <Form.Label className="mr-1"> Form: </Form.Label>
                                                            <div className="date-wrapper">
                                                            <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChange}
                                                                className="form-control"
                                                            />
                                                            <i className="fa fa-calendar"></i>
                                                            </div>
                                                            </div>
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default OverSpeeds;