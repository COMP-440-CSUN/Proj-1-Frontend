import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Layout} from '../layout'
import {Post} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'
import {Reload} from '../App'
import {
  NavLink
} from "react-router-dom"

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
  const handleSubmit = async e => {
    e.preventDefault();
    if(password === cpassword)
    {
      const token = await loginUser({
        username,
        fname,
        lname,
        email,
        password
      });
      sessionStorage.setItem("token", token.token)
      sessionStorage.setItem("auth", token.auth)
      Reload();
    }
  }

  return (
    <div className="Login">
      <Layout>
        <Form onSubmit={handleSubmit}>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </Layout>
    </div>
  );
}

///https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data