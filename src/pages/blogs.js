import React from "react";
import { Get } from "../API/CallAPI";
import {
  NavLink
} from "react-router-dom"

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
    const albumData = await Get("", data);
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
            this.state.data.map((blog) => (
                <NavLink exact to = {"/blogs/" + blog.id} activeClassName="">
                  <div className="image-card">
                    <div className = "fill" >
                      <h1>{blog.title}</h1>
                    </div>
                      <h3>
                        {blog.description}
                      </h3>
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