import React, { useState } from "react";
import { 
  Form, 
  Button, 
  Navbar
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

class CreateBlog extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      subject: "",
      description: "",
      tags: ""
    }
  }

  createPost = async(e) => {
    e.preventDefault();
    try {
      var subject = this.state.subject;
      var description = this.state.description;
      var tags = this.state.tags;
      await axios.post('http://localhost:5000/postBlog', {
        subject : subject,
        description: description, 
        tags: tags
      })
      .then((resp)=>  {
        this.props.history.push("/home"); 
      }, (error) => {
        console.log(error);
      });      
    } catch (error) {
      console.error("Error response:");
      console.error(error);
    }
  };

  render() {
    return (
      <div className="Blog">
        <Navbar collapseOnSelect fixed='top' bg='dark'>
          <h4 className="blogTitle">BLOG</h4>
          <NavLink exact to = "/home" className="home">Back to Home</NavLink>
        </Navbar>
          <Form onSubmit={this.createPost}>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                autoFocus
                placeholder="The future of blockchain"
                value={this.state.subject}
                onChange={(e) => this.setSubject({subject: e.target.value})}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                autoFocus
                placeholder="Blockchain is a buzz word nowadays..."
                value={this.state.description}
                onChange={(e) => this.setDescription({description: e.target.value})}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                autoFocus
                placeholder="blockchain, bitcoin, decentralized"
                value={this.state.tags}
                onChange={(e) => this.setTags({tags: e.target.value})}
              >
              </Form.Control>
            </Form.Group>
            <Button className="postBtn" type="submit">Add New Post</Button>
          </Form>
      </div>
    );
  }
}
export default CreateBlog;
