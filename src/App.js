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
    this.state = {
      isAuth: sessionStorage.getItem("auth") === 'true'
    }
  }

  reload = () => {
    this.setState({
      isAuth: sessionStorage.getItem("auth") === 'true'
    })
  }

  render(){
    return (
      <Router>
        <Nav isAuth = {this.state.isAuth} reload = {this.reload} />
        <Switch>
          <Route path="/register"><Register/></Route>
          <Route path="/home"><Home/></Route>
          <Route path="/blog"><Blog/></Route>
          {!this.state.isAuth && <Route path="/login"><Login reload = {this.reload}/></Route>}
          {this.state.isAuth && <Route path="/home"><Home/></Route>}
        </Switch>
      </Router>
    );
  }
}