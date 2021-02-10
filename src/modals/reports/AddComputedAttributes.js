import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Card, Row, Col, Form, Accordion, Image } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


class AddComputedAttributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNotificationFunc: props.addNotificationFunc,
            open: true,
            calenderList: [],
            computedAttributesData: props.EditComputedAttributes ? props.EditComputedAttributes : {},
            isEdit: Object.keys(props.EditComputedAttributes).length === 0 ? false : true
        }
    }

    componentWillMount() {
        this.getCalendars();
    }

    getCalendars() {
        commonServices.getCalendars((res) => {
            this.setState({ calenderList: res });
        })
    }

    handleChange = date => {
        this.setState({
            expirationTime: date
        });
    };

    componentWillReceiveProps(nextProps) {
        // this.setState({ addNotifcationOpen: nextProps.addNotifcationOpen });
    }

    onOpenModal = () => {
        this.setState({ addNotifcationOpen: true });
    };

    onCloseModal = () => {
        // this.setState({ addNotifcationOpen: false });
        this.props.addComputedAttributesFunc()
    };

    changeComputedAttributesDetailsValue(key, value) {
        let tempObj = this.state.computedAttributesData;
        tempObj[key] = value;
        this.setState({ computedAttributesData: tempObj });
    }

    setNotificators() {
        let tempObj = this.state.computedAttributesData;
        tempObj['notificators'] = this.state.webOrEmail.join(",");
        this.setState({ computedAttributesData: tempObj });
    }

    addComputedAttributes = (event) => {
        // let tempObj = this.state.computedAttributesData;
        // tempObj[key] = value;
        // this.state.computedAttributesData.area = "surat";
        commonServices.addComputedAttributes(this.state.computedAttributesData, (res) => {
            this.onCloseModal()
        })
    }

    EditComputedAttributesFunc = (event) => {
        commonServices.computedAttributesEdit(this.state.computedAttributesData.id, this.state.computedAttributesData, (res) => {
            this.onCloseModal()
        })
    }


    render() {

        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup">
                        <div className="modal-name account-settings-name">
                            {this.state.isEdit ? <h6>Edit Computed Attributes</h6> : <h6>Add Computed Attributes</h6>}
                        </div>
                        <div className="modal-content account-settings-content">
                            <div className="account-wrapper">
                                <div className="account-info">
                                    <Form class="align-items-baseline">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Description
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="description"  value={this.state.computedAttributesData.description} onChange={(val) => {
                                                    this.changeComputedAttributesDetailsValue('description', val.target.value)
                                                }}/>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Attribute
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="attribute" value={this.state.computedAttributesData.attribute} onChange={(val) => {
                                                    this.changeComputedAttributesDetailsValue('attribute',val.target.value)
                                                }} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Expression
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="expression" value={this.state.computedAttributesData.expression} onChange={(val) => {
                                                    this.changeComputedAttributesDetailsValue('expression',val.target.value)
                                                }}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                Type
                                                </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" name="type" value={this.state.computedAttributesData.type} onChange={(val) => {
                                                    this.changeComputedAttributesDetailsValue('type',val.target.value)
                                                }}/>
                                            </Col>
                                        </Form.Group>
                                        {/* <Form.Group as={Row}>
                                            <Form.Label column sm="4">
                                                CalendarId
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="number" name="calendarid" value={this.state.computedAttributesData.calendarId} placeholder="" onChange={(val) => {
                                                    this.changeComputedAttributesDetailsValue('calendarId', val.target.value)
                                                }} />
                                                <select className="form-control" name="map" value={this.state.computedAttributesData.calendarId} onChange={(val) => {
                                                    this.changeComputedAttributesDetailsValue('calendarId', Number(val.target.value))
                                                }}>
                                                    <option value=""></option>
                                                    {
                                                        this.state.calenderList.map((list, index) => {
                                                            return <option key={index} value={list.id}>{list.name}</option>;
                                                        })
                                                    }
                                                    }
                                                </select>
                                            </Col>
                                        </Form.Group> */}

                                    </Form>
                                    <div className="button-wrapper d-flex align-content-center justify-content-between mt-2">
                                        <div className="button-action">

                                        </div>
                                        <div className="generate-button">
                                            {this.state.isEdit ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.EditComputedAttributesFunc}>Edit</a> :
                                                <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addComputedAttributes}>Save</a>}
                                            <a href="#" className="btn btn-primary btn-sm" onClick={this.onCloseModal}>Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddComputedAttributes;