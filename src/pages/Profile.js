
import axios from "axios";
import React from "react";
import {
  NavLink
} from "react-router-dom"
import { 
  Button

} from "react-bootstrap";



class Profile extends React.Component{
  
  constructor(props)
  {

    super(props)
    this.state={
      profileDate: null,
      blogsData: null,
      user: props.match.params.name == sessionStorage.getItem('username') ? sessionStorage.getItem('username') : props.match.params.name,
    }
  }

  async followUser(){
    console.log(this.state.user);
    
    const toFollow = this.state.user; //this field needs to have the username of the profile page visited
    console.log("to follow "+toFollow);
    const follow = await axios.post('http://localhost:5000/follow', {
      leader_name: toFollow,
      follower_name: sessionStorage.getItem('username'),
    })
    console.log(follow);
  }

  async getBlogsByUser(){
    console.log("profile user "  + this.state.user);
    const username = this.state.user;
    const blogsOfUser = await axios.post('http://localhost:5000/getBlogsByUser',{
      username: username
    })
    this.setState({
      blogsData: blogsOfUser
    })
    console.log(blogsOfUser);
    console.log(this.blogsData);
  }
  componentDidMount(){
    this.getBlogsByUser();
  }
  render(){
    return(
      <div>
        <p>Profile Page</p>
        <Button onClick={this.followUser()}>Follow</Button>
        <div className="blog-container">
        {
          this.state.blogsData ? (
            this.state.blogsData['data']['rows'].map((blog) => (
                <NavLink exact to = {"/blogs/" + blog.blogID} activeClassName="">
                  <div className="image-card">
                    <div className = "fill" >
                      <h4>{blog.subject}</h4>
                    </div>
                      <p>
                        {blog.description}
                      </p>
                      <p>
                        {blog.created_by} : {blog.creation_date.substring(0,10)}
                      </p>
                  </div>
                </NavLink>
            ))
            ):
            (
              <></>
              )
            }
        </div>
 
      </div>
      
    )
  }
}
export default Profile;

