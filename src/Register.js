import React, { Component } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap';
import login from './assets/login.jpg';
import { commonServices } from './components/redux/services/commonServices';


class Register extends Component {
    constructor(props) {
        super(props);
        // We have the same props as in our signup.js file and they serve the same purposes.
        this.state = {
          loading: false,
          registerUser:{}
        }
    }

    changeRegisterUserValue(key, value) {
        let tempObj = this.state.registerUser;
        tempObj[key] = value;
        this.setState({ registerUser: tempObj });
    }

    doRegister = () =>{
        commonServices.doRegister(this.state.registerUser, (res) => {
            this.props.history.push('/');
            // this.onCloseModal()
        })        
    }
    
    render() {
        return (
            <div className="login-wrapper mt-50 mb-50">
                <div className="login-detail-wrapper">
                    {/* <div className="ragi-info"><h4>Account Register</h4></div> */}
                    <Row>
                        <Col>
                            <div className="login-info">
                                <h4>Account Register</h4>
                                <Form>
                                <Form.Group as={Row} controlId="language">
                                    {/* <Form.Label column sm="4">
                                    Language
                                </Form.Label>
                                    <Col sm="8">
                                    <Form.Control type="text" />
                                    </Col> */}
                                </Form.Group>
                                <Form.Group as={Row} controlId="name">
                                    <Form.Label column sm="4">
                                    Name
                                </Form.Label>
                                    <Col sm="8">
                                    {/* <Form.Control type="text" /> */}
                                    <Form.Control type="text" placeholder="Name" value={this.state.registerUser.name} onChange={(val) => {
                                        this.changeRegisterUserValue('name', val.target.value)
                                    }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="email">
                                    <Form.Label column sm="4">
                                    Email
                                </Form.Label>
                                    <Col sm="8">
                                    <Form.Control type="text" placeholder="Email" value={this.state.registerUser.email} onChange={(val) => {
                                        this.changeRegisterUserValue('email', val.target.value)
                                    }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="password">
                                    <Form.Label column sm="4">
                                    Password
                                </Form.Label>
                                    <Col sm="8">
                                    <Form.Control type="text" placeholder="Password" value={this.state.registerUser.password} onChange={(val) => {
                                        this.changeRegisterUserValue('password', val.target.value)
                                    }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="password">
                                    <Form.Label column sm="4">
                                    </Form.Label>
                                    <Col sm="8">
                                    <div className="button-wrapper">
                                        <a onClick={this.sessionLogin} className="btn btn-default">Login</a>
                                        <a onClick={this.doRegister} className="btn btn-default">Register</a>
                                    </div>
                                    </Col>
                                </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


export default Register;