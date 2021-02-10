import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form, Card, Accordion } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: props.groups,
            groupsAdd: false,
            groupSelectItem: [],
            allgrpData: [],
            selectedEdit: [],
            groupename: ''
        }
    }

    componentWillMount() {
        this.getAllGroup()
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ groups: nextProps.groups });
    }

    onOpenModal = () => {
        this.setState({ groups: true });
    };

    onCloseModal = () => {
        this.setState({ groups: false });
    };

    onCloseAddModal = () => {
        this.setState({ groupsAdd: false });
    };

    getAllGroup = () => {
        commonServices.groupsDisplay((res) => {
            this.setState({ allgrpData: res })
        })
    }

    deleteGrp = () => {
        
        commonServices.groupsDelete(this.state.selectedEdit.id, (res) => {
            
            if (typeof (res) == "string") {
                alert(res)
            } else {
                this.setState({ groupSelectItem: [] })
                this.getAllGroup()
            }

        })
    }

    addGroup = (event) => {

        const grpData = {
            name: this.state.groupename,
            groupId: this.state.groupSelectItem == undefined ? 0 : this.state.groupSelectItem
            //uniqueId: this.refs.deviceidentifier.value
        }

        commonServices.groupsAdd(grpData, (res) => {
            if (typeof (res) == "string") {
                alert(res)
            } else {
                this.setState({ groupSelectItem: [] })
                this.onCloseAddModal()
                this.getAllGroup()
            }

        })
    }

    EditGroup = (event) => {
        const grpData = {
            id: this.state.selectedEdit.id,
            name: this.state.groupename,
            groupId: this.state.groupSelectItem == undefined ? 0 : this.state.groupSelectItem.id
            //uniqueId: this.refs.deviceidentifier.value
        }
        commonServices.groupsEdit(this.state.selectedEdit.id, grpData, (res) => {
            if (typeof (res) == "string") {
                alert(res)
            } else {
                this.setState({ groupSelectItem: [] })
                this.onCloseAddModal()
                this.getAllGroup()
            }

        })
    }

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.setState({ groupename: _d.name })
        this.state.groupSelectItem = { id: _d.groupId }
    }


    selectGroup = (e) => {
        this.setState({ groupSelectItem: e.target.value })
    }

    render() {
        return (
            <div>
                <Modal open={this.state.groups} onClose={this.onCloseModal}>
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Groups</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => this.setState({ groupsAdd: true })}>Add</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (this.state.selectedEdit.length == 0 ? 'disabled' : '')} onClick={() => this.setState({ groupsAdd: true })}>Edit</a>
                                    {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (this.state.selectedEdit.length == 0 ? 'disabled' : '')}>Share</a> */}
                                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (this.state.selectedEdit.length == 0 ? 'disabled' : '')} onClick={() => this.deleteGrp()}>Remove</a>
                                </div>
                            </div>
                            <div className="reports-table">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.allgrpData.map((list, index) => {
                                                return <tr key={index} className={(this.state.selectedEdit.id == list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}><td>{list.name}</td></tr>;
                                            })
                                        }


                                    </tbody>
                                </Table>
                            </div>
                            {/* <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">

                                </div>
                                <div className="generate-button">
                                    <a href="#" className="btn btn-primary btn-sm mr-2">Save</a>
                                    <a href="#" className="btn btn-primary btn-sm">Cancel</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </Modal>
                <Modal open={this.state.groupsAdd} onClose={this.onCloseAddModal}>
                    <div className="modal-popup small-information">
                        <div className="modal-name">
                            <h6>Groups</h6>
                        </div>
                        <div className="modal-content">
                            <div className="report-info">
                                <Form onSubmit={this.addGroup}>
                                    <Row>
                                        <Col>
                                            <div className="report-content">
                                                <Card>
                                                    <Card.Header>Required</Card.Header>
                                                    <Card.Body>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm="4">
                                                                Name<small className="text-danger">*</small>
                                                            </Form.Label>
                                                            <Col sm="6">
                                                                <Form.Control type="text" name="name" value={this.state.groupename} onChange={(val) => {
                                                                    this.setState({ groupename: val.target.value })
                                                                }} placeholder="" />
                                                            </Col>
                                                        </Form.Group>

                                                    </Card.Body>
                                                </Card>
                                                <Accordion>
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
                                                                        <select className="form-control" value={this.state.groupSelectItem.id} onChange={this.selectGroup}>
                                                                            <option ></option>
                                                                            {
                                                                                this.state.allgrpData.map((list, index) => {
                                                                                    return <option key={index} value={list.id}>{list.name}</option>;
                                                                                })
                                                                            }
                                                                        </select>
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
                                                    {
                                                        this.state.groupSelectItem.length == 0 ? <a href="#" className={"btn btn-primary btn-sm mr-2 " + (this.state.groupename.length == 0 ? 'disabled' : '')} onClick={this.addGroup}>Add</a> :
                                                            <a href="#" className={"btn btn-primary btn-sm mr-2 " + (this.state.groupename.length == 0 ? 'disabled' : '')} onClick={this.EditGroup}>Edit</a>
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

export default Groups;