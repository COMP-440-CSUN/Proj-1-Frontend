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
    }
  }
  async getBlogs(){
    const id = localStorage.getItem('id')
    const data = {id: id}
    const albumData = await axios.get("http://localhost:5000/getAllBlogs");
    console.log(albumData);
    this.setState({
      data: albumData
    })
  }

  componentDidMount(){
    this.getBlogs();
  }
  render(){
    return(
      <div>
        <div className="game-container">
        {
          this.state.data ? (
            this.state.data['data']['rows'].map((blog) => (
                <NavLink exact to = {"/blogs/" + blog.blogID} activeClassName="">
                  <div className="image-card">
                    <div className = "fill" >
                      <h1>{blog.subject}</h1>
                    </div>
                      <h3>
                        {blog.description}
                      </h3>
                      <p>
                        {blog.created_by} : {blog.creation_date}
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