import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { commonServices } from '../../components/redux/services/commonServices'

class Server extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverOpen: props.serverOpen,
            serverDetails: {},
            showAlert: false
        }
    }

    componentWillMount() {
        this.getServerDetails()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ serverOpen: nextProps.serverOpen });
    }

    onOpenModal = () => {
        this.setState({ serverOpen: true });
    };

    onCloseModal = () => {
        this.setState({ serverOpen: false });
    };

    getServerDetails() {
        commonServices.getServer((res) => {
            this.setState({ serverDetails: res })
        })
    }

    changeServerDetailsValue(key, value) {
        let tempObj = this.state.serverDetails;
        tempObj[key] = value;
        this.setState({ serverDetails: tempObj });
    }

    updateServer = () => {
        let data = this.state.serverDetails;
        commonServices.updateServer(data, (res) => {
            this.setState({ showAlert: true });
            setTimeout(() => {
                this.setState({ showAlert: false });
            }, 5000);
            this.onCloseModal();

        })
    }

    render() {
        return (
            <div>
                <div class="alertContainer">
                    <Alert variant="success" show={this.state.showAlert}>
                        <Alert.Heading>Success!</Alert.Heading>
                        <p>
                            Server Details Updated
                        </p>
                    </Alert>
                </div>
                <Modal open={this.state.serverOpen} onClose={this.onCloseModal} classNames="custom-modal-wrapper">
                    <div className="modal-popup reports-general-information">
                        <div className="modal-name">
                            <h6>Server settings</h6>
                        </div>
                        <div className="modal-content">
                            <div className="report-info">
                                <Row>
                                    <Col>
                                        <div className="account-info">
                                            <Form>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        Registration
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Check type="checkbox" label="" checked={this.state.serverDetails.registration} onChange={(val) => {
                                                            this.changeServerDetailsValue('registration', val.target.checked)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        Readonly
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Check type="checkbox" label="" checked={this.state.serverDetails.readonly} onChange={(val) => {
                                                            this.changeServerDetailsValue('readonly', val.target.checked)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        DeviceReadonly
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Check type="checkbox" label="" checked={this.state.serverDetails.deviceReadonly} onChange={(val) => {
                                                            this.changeServerDetailsValue('deviceReadonly', val.target.checked)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        LimitCommands
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Check type="checkbox" label="" checked={this.state.serverDetails.limitCommands} onChange={(val) => {
                                                            this.changeServerDetailsValue('limitCommands', val.target.checked)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        Map
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <select className="form-control" name="map" value={this.state.serverDetails.map} onChange={(val) => {
                                                            this.changeServerDetailsValue('map', val.target.value)
                                                        }}>
                                                            <option value=""></option>
                                                            <option value="carto">Carto Basemaps</option>
                                                            <option value="osm">Open Street Map</option>
                                                            <option value="bingRoad">Bing Maps Road</option>
                                                            <option value="bingAerial">Bing Maps Aerial</option>
                                                            <option value="bingHybrid">Bing Maps Hybrid</option>
                                                            <option value="Baidu">Baidu</option>
                                                            <option value="yandexMap">Yandex Map</option>
                                                            <option value="yandexSat">Yandex Satellite</option>
                                                            <option value="wikimedia">Wikimedia</option>
                                                            <option value="custom">Custom (XYZ)</option>
                                                            <option value="customArcgis">Custom (ArcGIS)</option>
                                                        </select>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        BingKey
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" name="bingkey" value={this.state.serverDetails.bingKey} onChange={(val) => {
                                                            this.changeServerDetailsValue('bingKey', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        MapUrl
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" name="mapurl" value={this.state.serverDetails.mapUrl} onChange={(val) => {
                                                            this.changeServerDetailsValue('mapUrl', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        PoiLayer
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" name="poilayer" value={this.state.serverDetails.poiLayer} onChange={(val) => {
                                                            this.changeServerDetailsValue('poiLayer', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        Latitude
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="number" name="latitude" placeholder="" value={this.state.serverDetails.latitude} onChange={(val) => {
                                                            this.changeServerDetailsValue('latitude', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        Longitude
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="number" name="longitude" placeholder="" value={this.state.serverDetails.longitude} onChange={(val) => {
                                                            this.changeServerDetailsValue('longitude', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        Zoom
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="number" name="zoom" placeholder="" value={this.state.serverDetails.zoom} onChange={(val) => {
                                                            this.changeServerDetailsValue('zoom', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        TwelveHourFormat
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Check type="checkbox" label="" value={this.state.serverDetails.twelveHourFormat} checked={this.state.serverDetails.twelveHourFormat} onChange={(val) => {
                                                            this.changeServerDetailsValue('twelveHourFormat', val.target.checked)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        Version
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type="text" name="version" value={this.state.serverDetails.version} onChange={(val) => {
                                                            this.changeServerDetailsValue('version', val.target.value)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        ForceSettings
                                                </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Check type="checkbox" label="" checked={this.state.serverDetails.forceSettings} onChange={(val) => {
                                                            this.changeServerDetailsValue('forceSettings', val.target.checked)
                                                        }} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="4">
                                                        CoordinateFormat
                                                </Form.Label>
                                                    <Col sm="8">
                                                        {/* <Form.Control type="text" name="coordinateformat" value={this.state.serverDetails.coordinateFormat} onChange={(val) => {
                                                            this.changeServerDetailsValue('coordinateFormat', val.target.value)
                                                        }}/> */}
                                                        <select className="form-control" name="coordinateformat" value={this.state.serverDetails.coordinateFormat} onChange={(val) => {
                                                            this.changeServerDetailsValue('coordinateFormat', val.target.value)
                                                        }}>
                                                            <option value=""></option>
                                                            <option value="dd">Decimal Degrees</option>
                                                            <option value="ddm">Degrees Decimal Minutes</option>
                                                            <option value="dms">Degrees Minutes Seconds</option>
                                                        </select>
                                                    </Col>
                                                </Form.Group>

                                            </Form>
                                            <div className="button-wrapper d-flex align-content-center justify-content-between mt-2">
                                                <div className="button-action">

                                                </div>
                                                <div className="generate-button">
                                                    <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.updateServer}>Save</a>
                                                    <a href="#" className="btn btn-primary btn-sm" onClick={this.onCloseModal}>Cancel</a>
                                                </div>
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

export default Server;