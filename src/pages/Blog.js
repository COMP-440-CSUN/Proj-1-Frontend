import React, { useState } from "react";
import { 
  Form, 
  Button, 
  Navbar
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";

export default function Blog() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  let history = useHistory();

  const createPost = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/postBlog', {
      subject: subject,
      description: description, 
      tags: tags
    }).then(()=>
    { 
      console.log('Success');
      window.alert("New Post was created successfully.")
      history.push("/home");
    })
  }

  return (
    <div className="Blog">
      <Navbar collapseOnSelect fixed='top' bg='dark'>
        <h4 className="blogTitle">BLOG</h4>
        <NavLink exact to = "/home" className="home">Back to Home</NavLink>
      </Navbar>
        <Form onSubmit={createPost}>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              autoFocus
              placeholder="The future of blockchain"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              autoFocus
              placeholder="Blockchain is a buzz word nowadays..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              autoFocus
              placeholder="blockchain, bitcoin, decentralized"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Button className="postBtn" type="submit">Add New Post</Button>
        </Form>
    </div>
  );
}
