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

class Blog extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      data: null,
      pageURL: props.match.params.id,
      comment: ""
    }
  }
  async getBlog(){
    const data = {id: this.state.pageURL}
    const blogData = await Get("" + this.state.pageURL, data);
    this.setState({
      data: blogData
    })
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    try {
      var comment = this.state.comment;
      await axios.post('http://localhost:5000/comment', {
        comment    : comment,
      })
      .then((resp)=>  {
        this.props.history.push("/home"); // go to the same blog to "reload"
      }, (error) => {
        console.log(error);
      });      
    } catch (error) {
      console.error("Error response:");
      console.error(error);
    }
  };

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
                  this.state.data.map((blog) => (
                      <div className="image-card">
                        <div className = "fill" >
                          <h1>{blog.title}</h1>
                        </div>
                        <div className = "fill" >
                          <h2>{blog.description}</h2>
                        </div>
                      </div>
                  ))
                }
                <Form onSubmit={this.handleSubmit}>
                <Form.Group size="lg" controlId="comment">
                  <Form.Label className="text-light">Your Own Comment!</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Enter comment Name"
                    value={this.state.comment}
                    onChange={(e) => this.setState({comment: e.target.value})}
                  />
                </Form.Group>
                <Button 
                  className="login-button d-flex justify-content-center" 
                  block size="md" 
                  type="submit" 
                  disabled={!this.validateForm()}
                  >
                  Submit
                </Button>
              </Form>
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
          <NavLink exact to = {"/blogs/" + this.state.pageURL + "/newBlog"} activeClassName="">Create Blog</NavLink>
        </div>
      </div>
    )
  }
}
export default Blog;