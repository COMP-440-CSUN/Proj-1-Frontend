import React from "react";
import { Get } from "../API/CallAPI";
import {
  NavLink
} from "react-router-dom"
import axios from "axios";

class Blogs extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      data: null,
      tags: null
    }
  }
  async getBlogs(){
    const id = localStorage.getItem('id')
    const data = {id: id}
    const blogData = await axios.get("http://localhost:5000/getAllBlogs");
    console.log(blogData);
    this.setState({
      data: blogData
    })

    console.log(data);
  }

  componentDidMount(){
    this.getBlogs();
  }
  render(){
    return(
      <div>
        <div className="d-flex justify-content-center p-2 py-3">
          <NavLink exact to = {"/create-blog"} activeClassName=""><h3 className="text-light bg-dark p-3 rounded">Create Blog</h3></NavLink>
        </div>
        <div className="blog-container">
        {
          this.state.data ? (
            this.state.data['data']['rows'].map((blog) => (
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
export default Blogs;