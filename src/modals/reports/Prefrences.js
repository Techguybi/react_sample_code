import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';

class Prefrences extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            prefrenceOpen: props.prefrenceOpen,
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ prefrenceOpen: nextProps.prefrenceOpen });
    }

    onOpenModal = () => {
        this.setState({ prefrenceOpen: true });
    };

    onCloseModal = () => {
        this.setState({ prefrenceOpen: false });
    };


    render() {

        return (
            <div>
                <Modal open={this.state.prefrenceOpen} onClose={this.onCloseModal} classNames="custom-modal-wrapper">
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Prefrences</h6>
                        </div>
                        <div className="modal-content">
                            <div className="report-info">
                                <Row>
                                    <Col>
                                        <div className="report-content">
                                            <Form>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="4">
                                                        Speed Units:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="default" id="reports">
                                                                knots
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1">knots</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">km/h</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">mph</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Time zone:
    
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Time stamps print interval:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Trace recording interval:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Automatic zoom level:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <Form.Control type="text" className="w-50 " />
                                                            <a href="#" className="btn btn-primary">Use current zoom</a>
                                                        </div>
                                                    </Col>
                                                </Form.Group>
                                                <div className="title-name mb-3">
                                                    <h5>Default map state</h5>
                                                </div>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Map:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="default" id="reports">
                                                                OpenStreetMap
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1">OpenStreetMap</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Google Hybrid</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Google Normal</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Longitude:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Latitude:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Zoom:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Maximize overview map:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        {['checkbox'].map(type => (
                                                            <div key={`custom-${type}`} className="mb-2">
                                                                <Form.Check
                                                                    custom
                                                                    type={type}
                                                                    id={`custom-${type}`}
                                                                    label={``}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        Overlays:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        {['checkbox'].map(type => (
                                                            <div key={`custom-${type}`} className="mb-2">
                                                                <Form.Check
                                                                    custom
                                                                    type={type}
                                                                    id={`custom-${type}`}
                                                                    label={`Overlays`}
                                                                />
                                                                <Form.Check
                                                                    custom
                                                                    type={type}
                                                                    id={`custom-${type}`}
                                                                    label={`Geo-fences`}
                                                                />
                                                                <Form.Check
                                                                    custom
                                                                    type={type}
                                                                    id={`custom-${type}`}
                                                                    label={`Vector`}
                                                                />
                                                                <Form.Check
                                                                    custom
                                                                    type={type}
                                                                    id={`custom-${type}`}
                                                                    label={`Markers`}
                                                                />
                                                                <Form.Check
                                                                    custom
                                                                    type={type}
                                                                    id={`custom-${type}`}
                                                                    label={`Seamark`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="4">
                                                        <a href="#" className="btn btn-success">Track from map</a>
                                                    </Form.Label>
                                                </Form.Group>
                                                {/* <Form.Group  controlId="formPlaintextPassword" className="text-right">
                                                   <a href="#" className="btn btn-success float-right">Save</a>
                                                </Form.Group> */}
                                            </Form>
                                        </div>
                                        <div className="button-wrapper d-flex align-content-center justify-content-between">
                                            <div className="button-action">

                                            </div>
                                            <div className="generate-button">
                                                <a href="#" className="btn btn-primary btn-sm mr-2">Save</a>
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
        );
    }
}

export default Prefrences;