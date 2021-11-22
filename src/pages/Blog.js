import React from "react";
import { 
  Form, 
  Button, 
  Navbar
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Blog() {

  return (
    <div className="Blog">
      <Navbar collapseOnSelect fixed='top' bg='dark'>
        <h4 className="blogTitle">BLOG</h4>
        <NavLink exact to = "/home" className="home">Back to Home</NavLink>
      </Navbar>
        <Form>
          <input className="form-control my-3" placeholder="Subject"/>
          <textarea className="form-control my-3" placeholder="Description"></textarea>
          <Button>Add New Post</Button>
        </Form>
    </div>
  );
}
