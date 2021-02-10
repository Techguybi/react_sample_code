import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';

class TrackerServer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            trackerServerLog: props.trackerServerLog,
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ trackerServerLog: nextProps.trackerServerLog });
    }

    onOpenModal = () => {
        this.setState({ trackerServerLog: true });
    };

    onCloseModal = () => {
        this.setState({ trackerServerLog: false });
    };


    render() {

        return (
            <div>
                <Modal open={this.state.trackerServerLog} onClose={this.onCloseModal} classNames="custom-modal-wrapper">
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Tracker Server Log</h6>
                        </div>
                        <div className="modal-content">
                            <div className="report-info">
                                <Row>
                                    <Col>
                                        <div className="report-content">
                                            <Form>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Col>
                                                        <Form.Control as="textarea" rows="10" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                                    <Form.Label column sm="2">
                                                        Log size (in KB):
                                                    </Form.Label>
                                                    <Col sm="2">
                                                        <Form.Control type="text" placeholder="100" />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <div className="button-wrapper d-flex align-content-center justify-content-between">
                                            <div className="button-action">

                                            </div>
                                            <div className="generate-button">
                                                <a href="#" className="btn btn-primary btn-sm mr-2">Refresh</a>
                                                <a href="#" className="btn btn-primary btn-sm">Close</a>
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

export default TrackerServer;