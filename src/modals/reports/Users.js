import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'
import AccountSettings from '../reports/AccountSettings'


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersOpen: props.usersOpen,
            allUserData: [],
            accountOpen: false
        }
    }

    componentWillMount() {
        this.getAllUsers()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ usersOpen: nextProps.usersOpen });
    }

    getAllUsers = () => {
        commonServices.UserAllDisplay((res) => {
            this.setState({ allUserData: res })
        })
    }

    accountOpenFun = () => {
        this.getAllUsers()
        this.setState({ accountOpen: !this.state.accountOpen })
    }

    onOpenModal = () => {
        this.setState({ usersOpen: true });
    };

    onCloseModal = () => {
        this.setState({ usersOpen: false });
    };


    render() {

        return (
            <div className="w-100">
                <Modal open={this.state.usersOpen} onClose={this.onCloseModal}>
                    <div className="modal-popup users-general-information">
                        <div className="modal-name">
                            <h6>Users</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => this.setState({ accountOpen: true })}>Add</a>
                                    <a href="#" className="btn btn-success btn-sm mr-2">Remove</a>
                                    <a href="#" className="btn btn-danger btn-sm mr-2" disabled>Change Password</a>
                                </div>

                            </div>
                            <div className="reports-table">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Administrator</th>
                                            <th>Manager</th>
                                            <th>Read only</th>
                                            <th>Archive</th>
                                            <th>Blocked</th>
                                            <th>Expiration date</th>
                                            <th>Maximum number of devices</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.allUserData.map((list, index) => {
                                                return <tr key={index}>
                                                    <td>{list.name}</td>
                                                    <td>
                                                        <Form.Check type="checkbox" label="" checked={list.administrator} ref="deviceDisabled" />
                                                    </td>
                                                    <td>
                                                        <Form.Check type="checkbox" label="" checked={list.manager} ref="deviceDisabled" />
                                                    </td>
                                                    <td>
                                                        <Form.Check type="checkbox" label="" checked={list.readonly} ref="deviceDisabled" />
                                                    </td>
                                                    <td>
                                                        <Form.Check type="checkbox" label="" checked={list.archive} ref="deviceDisabled" />
                                                    </td>
                                                    <td>
                                                        <Form.Check type="checkbox" label="" checked={list.disabled} ref="deviceDisabled" />
                                                    </td>
                                                    <td> <Form.Control type="text" placeholder="" /></td>
                                                    <td></td>
                                                </tr>;
                                            })
                                        }
                                        {/* <tr>
                                            <td>admin</td>
                                            <td>{['checkbox'].map(type => (
                                                <div key={`custom-${type}`} className="mb-2">
                                                    <Form.Check
                                                        custom
                                                        type={type}
                                                        id={`custom-${type}`}
                                                        label={``}
                                                    />
                                                </div>
                                            ))}</td>
                                            <td>{['checkbox'].map(type => (
                                                <div key={`custom-${type}`} className="mb-2">
                                                    <Form.Check
                                                        custom
                                                        type={type}
                                                        id={`custom-${type}`}
                                                        label={``}
                                                    />
                                                </div>
                                            ))}</td>
                                            <td>{['checkbox'].map(type => (
                                                <div key={`custom-${type}`} className="mb-2">
                                                    <Form.Check
                                                        custom
                                                        type={type}
                                                        id={`custom-${type}`}
                                                        label={``}
                                                    />
                                                </div>
                                            ))}</td>
                                            <td>{['checkbox'].map(type => (
                                                <div key={`custom-${type}`} className="mb-2">
                                                    <Form.Check
                                                        custom
                                                        type={type}
                                                        id={`custom-${type}`}
                                                        label={``}
                                                    />
                                                </div>
                                            ))}</td>
                                            <td>{['checkbox'].map(type => (
                                                <div key={`custom-${type}`} className="mb-2">
                                                    <Form.Check
                                                        custom
                                                        type={type}
                                                        id={`custom-${type}`}
                                                        label={``}
                                                    />
                                                </div>
                                            ))}</td>
                                            <td> <Form.Control type="text" placeholder="" /></td>
                                            <td></td>
                                        </tr> */}
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
                {this.state.accountOpen && <AccountSettings accountOpen={this.accountOpenFun} EditUser={this.state.EditUserAccount} />}
            </div>
        );
    }
}

export default Users;