import React, { Component } from "react";
import Login from "../../components/Login";
import "./LoginPage.scss";
import API from "../../utils/API";
import { Container, Row, Col } from "reactstrap";

class LoginPage extends Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    confirmPassword: "",
    user: null,
    message: ""
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.login({
        username: this.state.username,
        password: this.state.password
      }).then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          window.location.href = "/profile";
        } else if (user.data.message) {
          this.setState({
            message: user.data.message
          });
        }
      });
    }
  };
  render() {
    return (
      <Container fluid id="loginBox">
        <Row>
          <Col sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} xl={{ size: 4, offset: 4 }}>
            <div className="signup-inner">
              <Login
                username={this.state.username}
                password={this.state.password}
                handleLogin={this.handleLogin}
                handleInputChange={this.handleInputChange}
                message={this.state.message}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginPage;