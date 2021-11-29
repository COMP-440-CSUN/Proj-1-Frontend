import React, { useState, Component } from "react";

import { 
  Form, 
  Button, 
  Navbar,
  CarouselItem
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Blog() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [blogID, setBlogID] =useState("")
 
  let history = useHistory();
  createPost = async(e) => {
    e.preventDefault();

     const blogdata = await axios.post('http://localhost:5000/postBlog', {
      subject: subject,
      description: description, 
      username:  sessionStorage.getItem('username')
    }).then((resp)=>
    { 
      console.log(resp);
      var blogid = resp['data']['blogId'];
      console.log(blogid);
      var finalTags = tags.split(",");
      //finalTags[i]
      for(let i = 0; i < finalTags.length; i++){
        createTags(finalTags[i], blogid);
      }
      
    })
  }
  const createTags = async(passedTag, passedBlogId) => {
    console.log(passedBlogId);
    console.log(passedTag);
    await axios.post('http://localhost:5000/addTag', {
      blogid: passedBlogId,
      tag: passedTag
    }).then((resp)=>{
      console.log("tag posted");
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
            <Form.Label>Tasgs</Form.Label>
            <Form.Control
              autoFocus
              placeholder="Blockchain is a buzz word nowadays..."
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
export default CreateBlog;
