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
  NavLink,
  Redirect
} from "react-router-dom"

import axios from "axios";
import { useHistory } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  async function loginUser(credentials) {
    return Post(ENDPOINTS.REGISTER, credentials)
   }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  let history = useHistory();

  const addUser = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/register', {
      username: username,
      fName: fname,
      lName:lname,
      email:email,
      password:password
    }).then(()=> 
    {
      console.log('Success');
      window.alert("user created succesfuly")
      history.push("/home");
    })
  }

  return (
    <div className="Register">
      <Container>
        <Row>
          <Col>
            <h1>Sign Up</h1>
            <Form onSubmit={addUser}>
              <Form.Group size="lg" controlId="lname">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="fname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="lname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </Form.Group>
              <Button 
                className="register-button" 
                block size="md" 
                type="submit" 
                disabled={!validateForm()}
                >
                Sign Up
              </Button>
            </Form>
            <div className="yesAccount">Already have an account?
              <NavLink exact to = "/home" activeClassName="home">Sign In</NavLink>
            </div>  
          </Col>
        </Row>
      </Container>
    </div>
  );
}

///https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data