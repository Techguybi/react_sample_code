import React, { Component } from 'react';
import { Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import Devices from './modals/devices/Devices'
import { deviceServices } from './components/redux/services/deviceServices'

const initialState = {
    deviceOpen: false,
    allDevice: [],
    EditDevice: {}
};

class Objects extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    componentDidMount() {
        this.getAllDevice()
    }

    getAllDevice = () => {
        deviceServices.groupsDevices((res) => {
            this.setState({ allDevice: res })
            this.setState({ EditDevice: {} })
        })
    }

    openEditDevice = (_data) =>  {
        this.setState({ EditDevice: _data })
        //this.setState({ deviceOpen: true })
    }

    deviceOpenFun = () => {
        this.setState({ deviceOpen: !this.state.deviceOpen })
        this.getAllDevice()
    }

    deviceDelete = (device) => {
        deviceServices.devicesDelete(device.id, (res) => {
            this.getAllDevice();
        })
    }

    render() {
        return (
            <div className="objects-wrapper">
                <h4>Devices</h4>
                    {/* <Button className="active" variant="default" onClick={() => { this.setState({ deviceOpen: true }) }}>Add</Button>
                    <Button variant="default" className={(this.state.EditDevice.length == 0 ? 'disabled' : '')} onClick={() => this.setState({ deviceOpen: true })}>Edit</Button> */}
                    {/* <Button variant="default">Share</Button>
                    <Button variant="default">Remove</Button>
                    <Button variant="default">Command</Button> */}
                <div className="button-action" style={{padding : '10px'}}>
                    <a href="#"  variant="default" className="btn btn-primary btn-sm mr-2" onClick={() => { this.setState({ deviceOpen: true }) }}>Add</a>
                    <a href="#" className={"btn btn-dark btn-sm mr-2 " + (Object.keys(this.state.EditDevice).length == 0 ? 'disabled' : '')} onClick={() => this.setState({ deviceOpen: true })}>Edit</a>
                    <a href="#" className={"btn btn-danger btn-sm mr-2 " + (Object.keys(this.state.EditDevice).length == 0 ? 'disabled' : '')} onClick={() => this.deviceDelete(this.state.EditDevice)}>Remove</a>
                </div>
                <div className="filter-wrapper">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Amount (to the nearest dollar)" />
                        <InputGroup.Append>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <ListGroup>
                        {
                            this.state.allDevice.map((list, index) => {
                                return <ListGroup.Item variant="warning" onClick={() => this.openEditDevice(list)} key={index}>{list.name}</ListGroup.Item>;
                            })
                        }
                    </ListGroup>
                </div>
                {this.state.deviceOpen && <Devices deviceOpen={this.deviceOpenFun} EditDevice={this.state.EditDevice}  />}
            </div>
        );
    }
}

export default Objects;