import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form, Card, Accordion } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddComputedAttributes from '../reports/AddComputedAttributes';
import { commonServices } from '../../components/redux/services/commonServices';


class ComputedAttributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gfoOpen: true,
            startDate: new Date(),
            computedAttributesList:[],
            selectedEdit: {},
            computedAttributesSelectItem:[],
            addComputedAttributesOpen: false
        }
    }

    componentWillMount() {
        this.getAllComputedAttributes();
    }

    getAllComputedAttributes = () => {
        commonServices.getComputedAttributes((res) => {
            this.setState({ computedAttributesList: res });
            this.setState({ selectedEdit: {} });
            // this.setState({ notificationSelectItem: [] });
        })
    }

    addComputedAttributesFunc = () => {
        this.getAllComputedAttributes();
        this.setState({ addComputedAttributesOpen: !this.state.addComputedAttributesOpen })
    }

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.state.computedAttributesSelectItem = { id: _d.id }
    }

    deleteNotification = () => {
        commonServices.computedAttributesDelete(this.state.selectedEdit.id, (res) => {
            this.setState({ computedAttributesSelectItem: [] })
            this.getAllComputedAttributes();
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


    render() {

        return (
            <div>
                <Modal open={this.state.gfoOpen} onClose={this.onCloseModal} classNames="custom-modal-wrapper">
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Computed Attributes</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => this.setState({ addComputedAttributesOpen: true })}>Add</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ addComputedAttributesOpen: true })}>Edit</a>
                                    {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')}>Share</a> */}
                                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.deleteNotification()}>Remove</a>
                                </div>

                            </div>
                            <div className="report-info">
                                <div className="reports-table">
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Attributes</th>
                                                <th>Expression</th>
                                                <th>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.computedAttributesList.length > 0 ?
                                                this.state.computedAttributesList.map((list, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.description}</td>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.attribute}</td>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.expression}</td>
                                                            <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.type}</td>
                                                        </tr>
                                                    )
                                                }) :
                                                <tr><td colSpan="4"> No Computed Attributes </td></tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                {this.state.addComputedAttributesOpen && <AddComputedAttributes addComputedAttributesFunc={this.addComputedAttributesFunc} EditComputedAttributes={this.state.selectedEdit}/>}
            </div>
        );
    }
}

export default ComputedAttributes;