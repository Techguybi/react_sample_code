import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import { commonServices } from '../../components/redux/services/commonServices'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  Marker,
  Polygon
} from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

const coords = []

export class AddArea extends Component {

  static defaultProps = {
    center: {
      lat: -15.779181,
      lng: 128.735545,
    },
    zoom: 14
  };

  static defaultProps = {
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAuSMZS2TPhoiI1_wWWgFet7MK6lYUTKMo&v=3.exp&libraries=geometry,drawing,places",
  }

  constructor(props) {
    super(props);
    
    this.state = {
      bottomActive: false,
      open: true,
      isEdit: Object.keys(props.EditArea).length === 0 ? false : true,
      shapeData: props.EditArea ? props.EditArea : [],
      selectedShape: '',
      selectedShapeName: '',
      coords: []
    }
  }

  ClearMap = () =>{
    this.setState({shapeData : []})
  }


  componentDidMount() {
    let tempCoords = [];
    if (Object.keys(this.state.shapeData).length !== 0 && this.state.shapeData.area && this.state.shapeData.area.search("LINESTRING") === 0) {
      let splitStr = this.state.shapeData.area.split(',')
      for (let index = 0; index < splitStr.length-1; index++) {
        let _coords = splitStr[index].replace("LINESTRING (", "").replace(")", "").split(' ')
        tempCoords.push({ lat: parseFloat(_coords[0]), lng: parseFloat(_coords[1]) })
        if (index+1 === splitStr.length ){
          this.setState({ coords: tempCoords })
        }
      }
      this.setState({ coords: tempCoords })
    } else if (Object.keys(this.state.shapeData).length !== 0 && this.state.shapeData.area && this.state.shapeData.area.search("POLYGON") === 0) {
      let splitStr = this.state.shapeData.area.split(', ')
      // for (let index = 0; index < splitStr.length -1; index++) {
        // let _coords = splitStr[index].replace("POLYGON ((", "").replace("))", "").split(' ')
        let _coords = splitStr[0].replace("POLYGON ((", "").replace("))", "").split(',');
        for (let idx = 0; idx < _coords.length; idx++) {
          let __coords = _coords[idx].split(" ");
          tempCoords.push({ lat: parseFloat(__coords[0]), lng: parseFloat(__coords[1]) })
          if (idx+1 === _coords.length ){
            this.setState({ coords: tempCoords })
          } 
        }
      // }
    } else if (Object.keys(this.state.shapeData).length !== 0 && this.state.shapeData.area && this.state.shapeData.area.search("CIRCLE") === 0) {
      let splitStr = this.state.shapeData.area.split(', ')
      // for (let index = 0; index < splitStr.length-1; index++) {
        let _coords = splitStr[0].replace("CIRCLE (", "").replace(")", "").split(' ');
        let __coords = _coords[1].split(",");
        tempCoords.push({ lat: parseFloat(_coords[0]), lng: parseFloat(__coords[0]), radius:  parseFloat(__coords[1])})
      // }
      this.setState({ coords: tempCoords[0] })
    }
  }

  onCloseModal = () => {
    // this.setState({ addNotifcationOpen: false });
    this.props.addAreaFunc(this.selectedShape)
  };

  addArea(_this) {
    console.log(_this);
    let _tempdata = []
    if(!_this.selectedShapeName) {
      alert("No Shape added or updated");
      return;
    }
    if (_this.selectedShapeName == "CIRCLE") {
      _tempdata.push(_this.selectedShape.center.lat() + " " + _this.selectedShape.center.lng())
      _tempdata.push(_this.selectedShape.radius)
    } else {
      let areaData = _this.selectedShape.latLngs.i[0].i
      for (let index = 0; index < areaData.length; index++) {
        // areaData[index].lat() +" "+ areaData[index].lng()
        _tempdata.push(areaData[index].lat() + " " + areaData[index].lng())
      }
    }
    if (_this.selectedShapeName == 'POLYGON') {
      _this.selectedShape = _this.selectedShapeName + ' ((' + _tempdata + '))'
    } else {
      _this.selectedShape = _this.selectedShapeName + ' (' + _tempdata + ')'
    }

    _this.onCloseModal()
  }

  render() {
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    let shapeData = this.state.shapeData
    // let selectedShape = ''
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        onHeadingChanged={this.clickMap}
        defaultZoom={14}
        defaultCenter={{
          lat: -15.779181,
          lng: 128.735545,
        }}
      >
        {Object.keys(shapeData).length != 0 && shapeData.area &&  shapeData.area.search("CIRCLE") == 0 ? <Circle
          defaultCenter={{
            lat: this.state.coords.lat,
            lng: this.state.coords.lng
          }}
          options={{
            fillColor: '#BCDCF9',
            strokeColor: '#57ACF9',
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: false,
            editable: true,
            zIndex: 1
          }}
          radius={this.state.coords.radius}
        /> : null}

        {Object.keys(shapeData).length != 0 && shapeData.area &&  shapeData.area.search("LINESTRING") == 0 ? <Polygon
          path={this.state.coords}
          //key={1}
          options={{
            fillColor: '#BCDCF9',
            strokeColor: '#57ACF9',
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: false,
            editable: true,
            zIndex: 1
          }}
        /> : null}
        {Object.keys(shapeData).length != 0 && shapeData.area &&  shapeData.area.search("POLYGON") == 0 ? <Polygon
          path={this.state.coords}
          //key={1}
          options={{
            fillColor: '#BCDCF9',
            strokeColor: '#57ACF9',
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: false,
            editable: true,
            zIndex: 1
          }}
        /> : null}
        <DrawingManager
          onCircleComplete={(evt) => {
            shapeData = {}
            if (this.selectedShape) {
              this.selectedShape.setMap(null);
              this.selectedShapeName = 'CIRCLE'
              this.selectedShape = evt;
            } else {
              this.selectedShapeName = 'CIRCLE'
              this.selectedShape = evt;
            }
          }}

          onPolygonComplete={(evt) => {
            if (this.selectedShape) {
              this.selectedShape.setMap(null);
              this.selectedShapeName = 'POLYGON'
              this.selectedShape = evt;
            } else {
              this.selectedShapeName = 'POLYGON'
              this.selectedShape = evt;
            }
          }}

          onPolylineComplete={(evt) => {

            if (this.selectedShape) {
              this.selectedShape.setMap(null);
              this.selectedShapeName = 'LINESTRING'
              this.selectedShape = evt;
            } else {
              this.selectedShapeName = 'LINESTRING'
              this.selectedShape = evt;
            }
          }}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              //position: 'TOP_LEFT', 
              drawingModes: [
                'circle', 'polygon', 'polyline'
              ]
            },
            circleOptions: {
              fillColor: '#BCDCF9',
              strokeColor: '#57ACF9',
              fillOpacity: 0.5,
              strokeWeight: 2,
              clickable: false,
              editable: true,
              zIndex: 1
            },
            polygonOptions: {
              fillColor: '#BCDCF9',
              strokeColor: '#57ACF9',
              fillOpacity: 0.5,
              strokeWeight: 2,
              clickable: false,
              editable: true,
              zIndex: 1
            },
            polylineOptions: {
              fillColor: '#BCDCF9',
              strokeColor: '#57ACF9',
              fillOpacity: 0.5,
              strokeWeight: 2,
              clickable: false,
              editable: true,
              zIndex: 1
            }
          }}
        />
      </GoogleMap>
    ));

    return (
      // Important! Always set the container height explicitly
      <div>
        <Modal open={this.state.open} onClose={this.onCloseModal} >
          <div className="modal-popup">
            <div className="modal-name account-settings-name">
              <h6>Save Area</h6>
            </div>
            <div className="modal-content account-settings-content">
              <div className="account-wrapper">
                <div className="account-info">
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuSMZS2TPhoiI1_wWWgFet7MK6lYUTKMo&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                  <div className="button-wrapper d-flex align-content-center justify-content-between mt-2">
                    <div className="button-action">
                      {this.state.isEdit ? <a href="#" className="btn btn-primary btn-sm mr-2" onClick={this.ClearMap}>Clear</a> :
                        null}
                    </div>
                    <div className="generate-button">
                      <a href="#"className={"btn btn-primary btn-sm mr-2 " + (this.selectedShapeName == "" ? 'disabled' : '')}onClick={() => this.addArea(this)}>Save</a>
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

export default AddArea
