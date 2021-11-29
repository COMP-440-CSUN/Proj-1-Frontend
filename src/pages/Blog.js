import React from "react";
import { Get } from "../API/CallAPI";
import {
  NavLink
} from "react-router-dom"
import { 
  Button,
  Form,

} from "react-bootstrap";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

const options = ["positive","negative"];
class Blog extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      data: null,
      commentData: null,
      pageURL: props.match.params.id,
      comment: "",
      sentiment: "",
      isOpen: false
    }
  }
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  async getBlog(){
    console.log(this.state.pageURL);
    const blogData = await axios.post('http://localhost:5000/getBlogByID', {
      blogID : this.state.pageURL
    })
    const commentData = await axios.post('http://localhost:5000/getCommentsPerBlog', {
      blogID : this.state.pageURL
    })
    this.setState({
      data: blogData,
      commentData: commentData
    })
  }
  handleSentiment = (e) =>{
    console.log("hit");
    this.state.sentiment = e;
    console.log(this.state.sentiment);
  }
  
  submitComment = async(e) => {
    e.preventDefault();
    try {
      var comment = this.state.comment;
      var sentiment = this.state.sentiment;
      console.log(sentiment);
      console.log(comment);
      console.log(sessionStorage.getItem('username'));
      var blogPoster = this.state.data['data']['rows'][0].created_by; 
      await axios.post('http://localhost:5000/postComment', {
        description    : comment,
        posted_by    : sessionStorage.getItem('username'),
        sentiment : sentiment,
        blogID : this.state.pageURL,
        blogPoster : blogPoster
      })
      .then((resp)=>  {
        window.alert(resp['data']['message']);
        this.props.history.push("/home"); // go to the same blog to "reload"
      }, (error) => {
        console.log(error);
      }); 

   
           
    } catch (error) {
      console.error("Error response:");
      console.error(error);
    }
  };

  validateForm()
  {
    return this.state.comment.length > 0;
  }
  
  componentDidMount(){
    this.getBlog();
  }
  render(){
    return(
      <div>
        <div className="game-container">
          {
            this.state.data ? (
              <>
                {
                  this.state.data['data']['rows'].map((blog) => (
                      <div className="image-card">
                        <div className = "fill" >
                          <h1>{blog.subject}</h1>
                        </div>
                        <div className = "fill" >
                          <h2>{blog.description}</h2>
                        </div>
                      </div>
                  ))
                }
                {this.state.commentData ? (
                  this.state.commentData['data']['rows'].map((comment) => (
                      <div className="image-card">
                        <div className = "fill" >
                          <h1>{comment.sentiment}</h1>
                        </div>
                        <div className = "fill" >
                          <h2>{comment.description}</h2>
                        </div>
                      </div>
                  ))
                ):(<></>)}
                <Form onSubmit={this.submitComment}>
                  <Form.Group size="s" controlId="comment">
                    <Form.Label className="text-gray">Your Own Comment!</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter comment"
                      value={this.state.comment}
                      onChange={(e) => this.setState({comment: e.target.value})}
                    />
                  </Form.Group>
                  {/* <Form.Select aria-label="Floating label select example" name="sentiment" onSelect={this.handleSentiment}>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                     
                    </Form.Select>
                   */}
                </Form>
                <DropdownButton 
                    title="Sentiment"
                    onSelect={this.handleSentiment}>
                      <Dropdown.Item eventKey='Positive' href="#">
                        Positive
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='Negative' href="#">
                        Negative
                      </Dropdown.Item>
                  </DropdownButton> 
                 <Button
                    className="login-button d-flex justify-content-center" 
                    block size="md" 
                    type="submit" 
                    disabled={!this.validateForm()}
                    onClick={this.submitComment}
                    >
                    Submit
                  </Button>
              </>
              ):
              (
                <>
                {}
                </>
            )
          }
        </div>
        <div className="d-flex justify-content-center p-2 fixed-bottom position-fixed py-5">
          <NavLink exact to = {"/create-blog"} activeClassName="">Create Blog</NavLink>
        </div>
      </div>
    )
  }
}
export default Blog;