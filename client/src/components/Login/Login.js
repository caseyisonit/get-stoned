import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import "./Login.scss";

function Login(props) {
    return (
        <div className="innerLoginBox">

            <h1 className="x-large" align="center">LOG IN</h1>
            <hr></hr>
            {props.message ? (
                <Alert className="animated fadeIn" color="danger">{props.message}</Alert>
            ) : (<></>)}
            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="username" value={props.username} onChange={props.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="password" value={props.password} onChange={props.handleInputChange} />
                </FormGroup>
                <Button id="loginBtn" onClick={props.handleLogin} block>Login</Button>
                <p className="signupLink">
                    <Link to="/signup">Don't have an account yet?  Sign up here!</Link>
                </p>
            </Form>
        </div>
    );
}

export default Login;