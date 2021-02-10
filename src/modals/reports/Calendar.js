import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import Modal from "react-responsive-modal";
import ImportCalendar from '../reports/ImportCalendar'
import { commonServices } from '../../components/redux/services/commonServices'

export class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calendarOpen: props.calendarOpen,
            addCalendarOpen: false,
            selectedEdit: {},
            calendarList:[],
            calenderSelectItem:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ calendarOpen: nextProps.calendarOpen });
    }

    componentWillMount() {
        this.getAllCalenders();
    }

    onOpenModal = () => {
        this.setState({ calendarOpen: true });
    };

    onCloseModal = () => {
        this.setState({ calendarOpen: false });
    };

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.state.calenderSelectItem = { id: _d.id }
    }

    ImportCalendarFunc = () => {
        this.getAllCalenders();
        this.setState({ addCalendarOpen: !this.state.addCalendarOpen })
    }


    deleteCalendar = () => {
        commonServices.calenderDelete(this.state.selectedEdit.id, (res) => {
            // if (typeof (res) == "string") {
            //     alert(res)
            // } else {
                this.setState({ notificationSelectItem: [] })
                this.getAllCalenders();
            // }

        })
    }

    getAllCalenders = () => {
        commonServices.getCalendars((res) => {
            this.setState({ calendarList: res });
            this.setState({ selectedEdit: {} });
            this.setState({ calenderSelectItem: [] });
        })
    }

    render() {
        return (
            <div>
            <Modal open={this.state.calendarOpen} onClose={this.onCloseModal}>
                <div className="modal-popup reports-general-information">
                    <div className="modal-name">
                        <h6>Calenders</h6>
                    </div>
                    <div className="modal-content">
                        <div className="button-wrapper d-flex align-content-center justify-content-between">
                            <div className="button-action">
                                <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => this.setState({ addCalendarOpen: true })}>Add</a>
                                <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ addCalendarOpen: true })}>Edit</a>
                                {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')}>Share</a> */}
                                <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.deleteCalendar()}>Remove</a>
                            </div>

                        </div>
                        <div className="report-info">
                            <div className="reports-table">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.calendarList.length > 0 ? 
                                            this.state.calendarList.map((list, index) => {
                                                return (
                                                <tr key={index}>
                                                    <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.name}</td>
                                                </tr>
                                                )
                                            }) :
                                            <tr><td colSpan="4"> No Calendars </td></tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
            {this.state.addCalendarOpen && <ImportCalendar ImportCalendarFunc={this.ImportCalendarFunc} EditCalendar={this.state.selectedEdit}/>}
        </div>
        )
    }
}

export default Calendar
