import React from "react";
import "./styles.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import {Home, Login, Register, Blog, Blogs, CreateBlog} from './pages'
import Nav from './layout/Nav';

export default class App extends React.Component{
  constructor(props)
  {
    super(props)
    let auth = sessionStorage.getItem("auth") == null ? "" : sessionStorage.getItem("auth")
    this.state = {
      isAuth: auth.valueOf() == new String('loggedIn')
    }
  }

  reload = () => {
    let auth = sessionStorage.getItem("auth") == null ? "" : sessionStorage.getItem("auth")
    this.setState({
      isAuth: auth.valueOf() == new String('loggedIn')
    })
  }

  render(){
    return (
      <Router>
        <Nav isAuth = {this.state.isAuth} reload = {this.reload} />
        <Switch>
          <Route path="/register"><Register/></Route>
          <Route path="/home"><Home/></Route>
          <Route path="/blogs/:id" component = {Blog}></Route>
          <Route path="/blogs"><Blogs/></Route>
          <Route path="/create-blog"><CreateBlog/></Route>
          {!this.state.isAuth && <Route path="/"><Login reload = {this.reload}/></Route>}
          {this.state.isAuth && <Route path="/home"><Home/></Route>}
        </Switch>
      </Router>
    );
  }
}