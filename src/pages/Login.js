import React, { useState } from "react";
import {Post} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'
import {Reload} from '../App'
import { 
  Container,
  Button,
  Row, 
  Col,
  Form
} from "react-bootstrap";
import {
  NavLink
} from "react-router-dom"
import axios from "axios";
import { useHistory } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(credentials) {
    return Post(ENDPOINTS.LOGIN, credentials)
   }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    sessionStorage.setItem("token", token.token)
    sessionStorage.setItem("auth", token.auth)
    Reload();
  }

  let history = useHistory();

  const userLogin = async e => {
    e.preventDefault();
    let response = null
    try {
      response = await axios.post('http://localhost:5000/login', {
        email    : email,
        password : password,
      })
      .then(()=>  {
        this.props.history.replace = ("/home");
      });
      console.log(response);
    } catch (error) {
      console.error("Error response:");
      console.error(response);
      console.error(error);
    }
  };

  return (
    <div className="Login">
      <Container className="container">
        <Row>
          <Col>
          <h1 className="header">Sign In</h1>
            <Form onSubmit={userLogin}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button 
              className="login-button" 
              block size="md" 
              type="submit" 
              disabled={!validateForm()}
              // onClick={() => {
              //   history.replace("/home");
              // }}
              >
              Sign In
            </Button>
          </Form>
          <div className="noAccount">Don't have an account?
            <NavLink exact to = "/register" activeClassName="">Sign Up</NavLink>
          </div>
          </Col>
        </Row>  
      </Container>
    </div>
  );
}

///https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data