import React from "react";
import {
  NavLink, Link
} from "react-router-dom"
import axios from "axios";
import { 
  Button,
  Form, 

} from "react-bootstrap";


class Users extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      sameDateData: null,
      usersWhoNeverPosted: null,
      positiveUsersOnly: null,
      negativeComments: null,
      user1: null,
      user2: null,
      sameFollowers: null
    }
  }
  async getBlogsOnDate(){
    const blogData = await axios.get("http://localhost:5000/usersWhoPostedOnSameDate");
    console.log(blogData);
    this.setState({
      sameDateData: blogData
    })
    this.getMostBlogsPosted();
  }
  async getUsersWhoHaveNeverPosted(){
    const userData = await axios.get("http://localhost:5000/usersWhoNeverPostedBlog");
    this.setState({
      usersWhoNeverPosted: userData
    })
  }

  async getUsersWithPositiveBlogsOnly(){
    const userData = await axios.get("http://localhost:5000/getBlogsWithPositiveCommentsOnly");
    this.setState({
      positiveUsersOnly: userData
    })
  }
  async getUsersThatHaveOnlyPostedNegativeComments(){
    const userData = await axios.get("http://localhost:5000/getUsersWhoOnlyPostedNegativeComments");
    this.setState({
      negativeComments: userData
    })
  }
  
  getSameFollowers = async(e) => {
    e.preventDefault();
    const userData = await axios.post("http://localhost:5000/getSameFollowers", {
      follower_one: this.state.user1,
      follower_two: this.state.user2
    });
    this.setState({
      sameFollowers: userData
    })
 
  }

  getMostBlogsPosted(){
    var userMostPosted = this.state.sameDateData;
    var finalList = [];
    let temp = userMostPosted['data']['rows'][0].blogCount;
    
    finalList.push(userMostPosted['data']['rows'][0]);
    console.log(temp);
    for(let i = 1; i < userMostPosted['data']['rows'].length; i++){
      if(userMostPosted['data']['rows'][i].blogCount == temp){
        finalList.push(userMostPosted['data']['rows'][i]);
      }
    }
    this.setState({
      sameDateData:finalList
    })
    
    console.log(finalList);
  }

  componentDidMount(){
    this.getBlogsOnDate();
    this.getUsersWhoHaveNeverPosted();
    this.getUsersWithPositiveBlogsOnly();
    this.getUsersThatHaveOnlyPostedNegativeComments();
  }
  
  render(){
    return(
      <div>
        <h1 className="blog-container py-5">This page displays information about the users</h1>
        <div className="blog-container">
        <h4>Most Blogs Posted On 10/10/21</h4>
        {
          this.state.sameDateData?.length > 0 && 
          this.state.sameDateData ? (
            this.state.sameDateData.map((blog) => (
              <div className="image-card">
                <div className = "fill" >
                  <h4>{blog.created_by}</h4>
                </div>
                  <p>
                    {blog.description}
                  </p>
                  <p>
                    {blog.subject}
                  </p>
                  <p>
                    {blog.creation_date.substring(0,10)}
                  </p>
              </div>
            ))
            ):
            (
              <></>
              )
            }
            <h4>Users Who have Never Posted a blog</h4>
          {
            this.state.usersWhoNeverPosted ? (
              this.state.usersWhoNeverPosted['data']['rows'].map((user) => (
                  <NavLink exact to = {"/profile/" + user.username} activeClassName="">
                    <div className="image-card">
                      <div className = "fill" >
                        <h4>{user.username}</h4>
                      </div>
                    </div>
                  </NavLink>
              ))
              ):
              (
                <></>
            )
          }
           <h4>Users whose Blogs have Positive Comments Only</h4>
          {
            this.state.positiveUsersOnly ? (
              this.state.positiveUsersOnly['data']['rows'].map((user) => (
                  <NavLink exact to = {"/blogs/" + user.blogID} activeClassName="">
                    <div className="image-card">
                      <div className = "fill" >
                        <h4>{user.created_by}</h4>
                      </div>
                    </div>
                  </NavLink>
              ))
              ):
              (
                <></>
            )
          }
          <h4>Users Who have posted Negative Comments Only</h4>
          {
            this.state.negativeComments ? (
              this.state.negativeComments['data']['rows'].map((user) => (
                  <NavLink exact to = {"/profile/" + user.username} activeClassName="">
                    <div className="image-card">
                      <div className = "fill" >
                        <h4>{user.username}</h4>
                      </div>
                    </div>
                  </NavLink>
              ))
              ):
              (
                <></>
            )
          }
        </div>
        <div className="blog-container my-5">
          <h4>Find Mutual Followers Between Two Users</h4>
        <Form onSubmit={this.getSameFollowers}>
          <Form.Group>
            <Form.Label>User 1</Form.Label>
            <Form.Control
              autoFocus
              placeholder="Enter User 1"
              value={this.state.user1}
              onChange={(e) => this.setState({user1: e.target.value})}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>User 2</Form.Label>
            <Form.Control
              autoFocus
              placeholder="Enter User 2"
              value={this.state.user2}
              onChange={(e) => this.setState({user2 : e.target.value})}
            >
            </Form.Control>
          </Form.Group>
          <Button className="postBtn" type="submit">Find Mutual Followers</Button>
        </Form>
        {
          this.state.sameFollowers && 
          this.state.sameFollowers['data']['rows']?.length > 0 ? (
            this.state.sameFollowers['data']['rows'].map((user) => (
              <div className="image-card">
                <div className = "fill" >
                  <h4>{user.leader_name}</h4>
                </div>
              </div>
            ))
            ):
            (
              <div>
                There are no shared followers
              </div>
            )
        }
        </div>
      </div>
    )
  }
}
export default Users;
