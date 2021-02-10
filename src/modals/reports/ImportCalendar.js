import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'

class ImportCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            importOpen: props.ImportCalendarFunc,
            filePath: '',
            base64Obj: '',
            name: '',
            open: true,
            CalendarData: props.EditCalendar ? props.EditCalendar : {},
            isEdit:  Object.keys(props.EditCalendar).length === 0  ? false : true
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ importOpen: nextProps.importOpen });
    }

    onOpenModal = () => {
        this.setState({ importOpen: true });
    };

    onCloseModal = () => {
        this.setState({ importOpen: false });
        this.props.ImportCalendarFunc()
    };

    changeCalanderDetailsValue(key, value) {
        let tempObj = this.state.CalendarData;
        tempObj[key] = value;
        this.setState({ CalendarData: tempObj });
    }

    onChange = (e) => {
        let self = this;
        let file = document.getElementById("uploadFile");
        let name = file.value
        this.setState({ filePath: name })
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (res) {
            let str = res.target.result.replace("data:text/calendar;base64,", "");
            self.setState({ base64Obj: str })
            self.changeCalanderDetailsValue('data', str)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    addCalendar = (event) => {

        const calData = {
            name: this.state.CalendarData.name,
            data: this.state.CalendarData.data,
        }
        commonServices.addCalendar(calData, (res) => {
            this.onCloseModal()
        })
    }

    EditaddCalendarFunc = (event) =>{
        commonServices.editCalendar(this.state.CalendarData.id, this.state.CalendarData, (res) => {
            this.onCloseModal()
        })
    }

    render() {

        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="modal-popup small-information">
                        <div className="modal-name">
                            <h6>Calendar</h6>
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
                                                        <Form.Control type="text" placeholder="" value={this.state.CalendarData.name} onChange={(val) => {
                                                            this.changeCalanderDetailsValue('name', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        File to import:
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <div className="upload">
                                                            <Form.Control type="file" id="uploadFile" onChange={this.onChange} />
                                                        </div>
                                                        <div>{this.state.filePath}</div>
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <div className="button-wrapper d-flex align-content-center justify-content-between">
                                            <div className="button-action">

                                            </div>
                                            <div className="generate-button">
                                                {/* <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addCalendar}>Import</a> */}

                                                {this.state.isEdit ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.EditaddCalendarFunc}>Edit</a> :
                                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.addCalendar}>Save</a>}
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

export default ImportCalendar;