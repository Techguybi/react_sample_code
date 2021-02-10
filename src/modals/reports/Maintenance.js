import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import AddMaintenance from './AddMaintenance'
import "react-datepicker/dist/react-datepicker.css";
import { commonServices } from '../../components/redux/services/commonServices';
import commonData from "../../components/commonData";


class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.maintenanceTypeList = commonData.maintenanceType;
        this.state = {
            maintenanceOpen: props.maintenanceOpen,
            startDate: new Date(),
            addMaintenanceOpen: false,
            selectedEdit: {},
            maintenanceList:[],
            maintenanceSelectItem: []
        }
    }

    componentWillMount() {
        this.getMaintenanceList();
    }

    getMaintenanceList = () => {
        commonServices.getMaintenance((res) => {
            this.setState({ maintenanceList: res });
        })
    }

    selectEdit = (_d) => {
        this.setState({ selectedEdit: _d })
        //this.refs.groupename.value = _d.name;
        this.state.maintenanceSelectItem = { id: _d.id }
    }

    deleteMaintenance(){
        commonServices.maintenanceDelete(this.state.selectedEdit.id, (res) => {
            this.setState({ maintenanceSelectItem: [] })
            this.getMaintenanceList();
        })
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ maintenanceOpen: nextProps.maintenanceOpen });
    }

    onOpenModal = () => {
        this.setState({ maintenanceOpen: true });
    };

    onCloseModal = () => {
        this.setState({ maintenanceOpen: false });
    };

    maintenanceaddfunc = () => {
        this.setState({ addMaintenanceOpen: !this.state.addMaintenanceOpen })
    }

    checkType(type){
       return this.maintenanceTypeList[type];
    }


    render() {

        return (
            <div>
                <Modal open={this.state.maintenanceOpen} onClose={this.onCloseModal} >
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Maintenance</h6>
                        </div>
                        <div className="modal-content">
                            <div className="button-wrapper d-flex align-content-center justify-content-between">
                                <div className="button-action">
                                    {/* <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() => { this.setState({"selectedEdit" :  {}}); this.setState({ addMaintenanceOpen: true })}}>New</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ addNotifcationOpen: true })}>Edit</a>
                                    <a href="#" className={"btn btn-success btn-sm mr-2" + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} >Share</a>
                                    <a href="#" className={"btn btn-danger btn-sm mr-2" + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} disabled>Remove</a> */}

                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={() =>{ this.setState({"selectedEdit" :  {}}); this.setState({ addMaintenanceOpen: true })}}>Add</a>
                                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ addMaintenanceOpen: true })}>Edit</a>
                                    {/* <a href="#" className={"btn btn-success btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')}>Share</a> */}
                                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.selectedEdit).length == 0 ? 'disabled' : '')} onClick={() => this.deleteMaintenance()}>Remove</a>
                                </div>
                                {/* <div className="generate-button">
                                    <a href="#" className="btn btn-primary btn-sm">Generate</a>
                                </div> */}
                            </div>
                            <div className="reports-table">
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Start</th>
                                            <th>Period</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.maintenanceList.length > 0 ? 
                                            this.state.maintenanceList.map((list, index) => {
                                                return (
                                                <tr key={index}>
                                                    <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.name}</td>
                                                    <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{this.checkType(list.type)}</td>
                                                    <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.start}</td>
                                                    <td className={(this.state.selectedEdit.id === list.id ? 'editBackgroud' : '')} onClick={() => this.selectEdit(list)}>{list.period}</td>
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
                {this.state.addMaintenanceOpen && <AddMaintenance maintenanceaddfunc={this.maintenanceaddfunc} EditMaintenance={this.state.selectedEdit}/>}
            </div>
        );
    }
}

export default Maintenance;