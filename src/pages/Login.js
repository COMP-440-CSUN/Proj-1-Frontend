import React from "react";
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
import { withRouter } from "react-router";

class Login extends React.Component{
  constructor(props)
  {
    super(props)
    this.state = {
      email: "",
      password : "",
    }
  }
  
  validateForm()
  {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  userLogin = async(e) => {
    e.preventDefault();
    try {
      var email = this.state.email;
      var password = this.state.password;
      await axios.post('http://localhost:5000/login', {
        email    : email,
        password : password,
      })
      .then((resp)=>  {
        sessionStorage.setItem("auth", 'loggedIn')
        sessionStorage.setItem("username", resp['data']['row'][0]['username'])
        this.props.history.push("/home");
        this.props.reload()
      }, (error) => {
        console.log(error);
      });      
    } catch (error) {
      console.error("Error response:");
      console.error(error);
    }
  };
  render(){
    return (
      <div className="login-container">
        <Container>
          <Row>
            <Col>
            <h1 className="header">Sign In</h1>
              <Form onSubmit={this.userLogin}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={(e) => this.setState({email: e.target.value})}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              </Form.Group>
              <Button 
                className="login-button" 
                block size="md" 
                type="submit" 
                disabled={!this.validateForm()}
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
}

export default withRouter(Login);