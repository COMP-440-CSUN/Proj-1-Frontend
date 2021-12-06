import React, { useState, Component } from "react";
import { 
  Form, 
  Button, 
  Navbar,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

export default function Blog() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [blogID, setBlogID] =useState("")
  let history = useHistory();

  const createPost = async(e) => {
    e.preventDefault();
     const blogdata = await axios.post('http://localhost:5000/postBlog', {
      subject: subject,
      description: description, 
      username:  sessionStorage.getItem('username')
    }).then((resp)=>
    { 
      if(resp['data']['message'] != null){
        window.alert(resp['data']['message']);
      }else{
        var blogid = resp['data']['blogId'];
        console.log(blogid);
        var finalTags = tags.split(",");
        //finalTags[i]
        for(let i = 0; i < finalTags.length; i++){
          createTags(finalTags[i], blogid);
        }
        history.push("/blogs");
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
        <h4 className="blog-title">BLOG</h4>
        <NavLink exact to = "/blogs" className="home">Back to Home</NavLink>
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

