
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
      user: props.match.params.name ? props.match.params.name : sessionStorage.getItem('username') ,
      
    }
  }

  async followUser(){
    const toFollow = this.state.user; //this field needs to have the username of the profile page visited
    const follow = await axios.post('http://localhost:5000/follow', {
      leader_name: toFollow,
      follower_name: sessionStorage.getItem('username'),
    })
    window.alert(follow['data']['message']);
  }

  async getBlogsByUser(){
    const username = this.state.user;
    const blogsOfUser = await axios.post('http://localhost:5000/getBlogsByUser',{
      username: username
    })
    this.setState({
      blogsData: blogsOfUser
    })
  }

  async postitiveBlogs(){

    const username = this.state.user; //this field needs to have the username of the profile page visited
    const positive = await axios.post('http://localhost:5000/getMostPositiveBlogs', {
      username: username
    })
    if(positive['data']['rows'].length ==0 ){
      window.alert(this.state.user + " has no blogs with postive comments only");
    }
  }

  componentDidMount(){
    this.getBlogsByUser();
  }
  render(){
    return(
      <div>
        <div class="profile-container">
          <img class="profile-picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
          <p>{this.state.user}</p>
          <Button onClick={() => this.postitiveBlogs()}>Postitive Blogs</Button>
          <Button onClick={() => this.followUser()}>Follow</Button>
        </div>
        <div className="blog-container">
        {
          this.state.blogsData && 
          this.state.blogsData['data']['rows'].length > 0 ? (
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
            ):(
            
              <div>This User has not posted a blog yet</div>
            )
            }
        </div>
 
      </div>
      
    )
  }
}
export default Profile;

