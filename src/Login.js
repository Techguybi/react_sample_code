import React, { Component } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import login from './assets/login.jpg';
import { loginServices } from './components/redux/services/loginServices'
import { bindActionCreators } from 'redux';

class Login extends Component {
  constructor(props) {
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
    }
  }

  sessionLogin = () => {
    // const zipData = "email=" + "vinod" + "&password=" + "vinod123"
    if(!this.state.userEmail || !this.state.userPassword){
      alert("Please Enter username and password !");
      return;
    }
    const zipData = "email=" + this.state.userEmail + "&password=" + this.state.userPassword;
    loginServices.sessionLogin(zipData, (res) => {
      if (res == "Unauthorized" || res == undefined) {
        alert(res)
      } else {
        console.log(res);
        localStorage.setItem('userData', JSON.stringify(res));
        this.props.history.push('home');
      }

    })

  }


  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="login-wrapper">
        <div className="login-detail-wrapper">
          <Row>
            <Col sm="5">
              <img src={login} alt="login" className="img-fluid" />
            </Col>
            <Col sm="7">
              <div className="login-info">
                <h4>Account Login</h4>
                <Form>
                  <Form.Group as={Row} controlId="language">
                    {/* <Form.Label column sm="4">
                      Language
                  </Form.Label>
                    <Col sm="8">
                      <Form.Control type="text" />
                    </Col> */}
                  </Form.Group>
                  <Form.Group as={Row} controlId="user">
                    <Form.Label column sm="4">
                      User
                  </Form.Label>
                    <Col sm="8">
                      {/* <Form.Control type="text" /> */}
                      <Form.Control type="text" placeholder="Email" value={this.state.userEmail} onChange={(val) => {
                        this.setState({ 'userEmail': val.target.value });
                      }} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="password">
                    <Form.Label column sm="4">
                      Password
                  </Form.Label>
                    <Col sm="8">
                      {/* <Form.Control type="password" /> */}
                      <Form.Control type="password" placeholder="Password" value={this.state.userPassword} onChange={(val) => {
                        this.setState({ 'userPassword': val.target.value });
                      }} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="password">
                    <Form.Label column sm="4">
                    </Form.Label>
                    <Col sm="8">
                      <div className="button-wrapper">
                        <a onClick={this.sessionLogin} className="btn btn-default">Login</a>
                        <a href="/register" className="btn btn-default">Register</a>
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

export default Login;