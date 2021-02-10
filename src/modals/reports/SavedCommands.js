import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form, Card, Accordion } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddSavedCommands from '../reports/AddSavedCommands';
import { commonServices } from '../../components/redux/services/commonServices';
import commonData from "../../components/commonData";


class SavedCommands extends Component {
    constructor(props) {
        super(props);
        this.commandsList  = commonData.savedCommandsList;
        this.state = {
            gfoOpen: true,
            startDate: new Date(),
            savedCommandsList:[],
            selectedEdit: {},
            savedCommandSelectItem:[],
            savedCommandsOpen: false
        }
    }

    componentWillMount() {
        this.getAllSavedCommands();
    }

    getAllSavedCommands = () => {
        commonServices.getSavedCommands((res) => {
            this.setState({ savedCommandsList: res });
            this.setState({ selectedEdit: {} });
            // this.setState({ notificationSelectItem: [] });
        })
    }

    addSavedCommandsFunc = () => {
        this.getAllSavedCommands();
        this.setState({ savedCommandsOpen: !this.state.savedCommandsOpen })
    }

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.state.savedCommandSelectItem = { id: _d.id }
    }

    deleteNotification = () => {
        commonServices.savedCommandsDelete(this.state.selectedEdit.id, (res) => {
            this.setState({ savedCommandSelectItem: [] })
            this.getAllSavedCommands();
        })
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ gfoOpen: nextProps.gfoOpen });
    }

    onOpenModal = () => {
        this.setState({ gfoOpen: true });
    };

    onCloseModal = () => {
        this.setState({ gfoOpen: false });
    };

    checkType(type){
        return this.commandsList[type];
    }

    render() {

        return (
            <div>
                <Modal open={this.state.gfoOpen} onClose={this.onCloseModal}>
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Saved Commands</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() =>{ this.setState({"selectedEdit" :  {}}); this.setState({ savedCommandsOpen: true })}}>Add</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ savedCommandsOpen: true })}>Edit</a>
                                    {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (Object.keys(tshis.state.selectedEdit).length == 0 ? 'disabled' : '')}>Share</a> */}
                                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.deleteNotification()}>Remove</a>
                                </div>

                            </div>
                            <div className="report-info">
                                <div className="reports-table">
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Type</th>
                                                <th>Send SMS</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.savedCommandsList.length > 0 ?
                                                this.state.savedCommandsList.map((list, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.description}</td>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{this.commandsList[list.type]}</td>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.textChannel === true ? "Yes" : "No"}</td>
                                                        </tr>
                                                    )
                                                }) :
                                                <tr><td colSpan="3"> No Saved Commands </td></tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                {this.state.savedCommandsOpen && <AddSavedCommands addSavedCommandsFunc={this.addSavedCommandsFunc} EditSavedCommands={this.state.selectedEdit}/>}
            </div>
        );
    }
}

export default SavedCommands;