import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import AddDrivers from './AddDrivers'
import { commonServices } from '../../components/redux/services/commonServices'
import "react-datepicker/dist/react-datepicker.css";

class Drivers extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            driversOpen: props.driversOpen,
            driverList:[],
            selectedEdit: {},
            DriverSelectItem:[],
            addDriverOpen: false,
            open: true,
        }
    }

    componentWillMount() {
        this.getAllDrivers();
    }

    getAllDrivers = () => {
        commonServices.getDrivers((res) => {
            this.setState({ driverList: res });
            this.setState({ selectedEdit: {} });
            this.setState({ DriverSelectItem: [] });
        })
    }

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.state.DriverSelectItem = { id: _d.id }
    }

    driveraddfunc = () => {
        this.getAllDrivers();
        //this.getAllCalenders();
        this.setState({ addDriverOpen: !this.state.addDriverOpen })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ driversOpen: nextProps.driversOpen });
    }
    

    onOpenModal = () => {
        this.setState({ driversOpen: true });
    };

    onCloseModal = () => {        
        this.setState({ driversOpen: false });
    };

    deleteDriver = () => {
        commonServices.driverDelete(this.state.selectedEdit.id, (res) => {
            // if (typeof (res) == "string") {
            //     alert(res)
            // } else {
                this.setState({ driverSelectItem: [] })
                this.getAllDrivers();
            // }

        })
    }

    


    render() {

        return (
            <div>
                <Modal open={this.state.driversOpen} onClose={this.onCloseModal} >
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Drivers</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => this.setState({ addDriverOpen: true })}>New</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ addDriverOpen: true })}>Edit</a>
                                    {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')}>Share</a> */}
                                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.deleteDriver()}>Remove</a>
                                </div>
                            </div>
                            <div className="reports-table">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Identifier</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            {this.state.driverList.length > 0 ? 
                                                this.state.driverList.map((list, index) => {
                                                    return (
                                                    <tr key={index}>
                                                        <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.name}</td>
                                                        <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.uniqueId}</td>
                                                    </tr>
                                                    )
                                                }) :
                                                <tr><td colSpan="4"> No Notifications </td></tr>
                                            }

                                    </tbody>
                                </Table>
                            </div>
                    

                        </div>
                    </div>
                </Modal>
                {this.state.addDriverOpen && <AddDrivers driveraddfunc={this.driveraddfunc} EditDriver={this.state.selectedEdit}/>}
            </div>
        );
    }
}

export default Drivers;