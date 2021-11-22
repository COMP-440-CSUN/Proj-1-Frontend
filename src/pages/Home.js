import React from "react";
import {Layout} from '../layout'
import {Get} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'
import axios from 'axios'
import { 
  Button,
  Navbar,
} from "react-bootstrap";
import {
  NavLink
} from "react-router-dom"

class App extends React.Component {

  constructor() {
    super();
    this.state = { data: null };
  }

  async componentDidMount() {
    // const data = await Get(ENDPOINTS.HOME)
    // this.setState({data: data.string})
  }

  const
  render() {
    const { data } = this.state;
    const initDB = () => {
      console.log(sessionStorage.getItem("token"))
      axios.get('http://localhost:5000/initializeDB', {}).then(()=> 
      window.alert('Database Initalized')
      );
    }

    return (
      <div className="Home">
        <Navbar collapseOnSelect fixed='top' bg='dark'>
          <h4 className="homeTitle">HOME</h4>
          <Button className="initDB" type="submit" onClick={initDB}>
            Initialize Database
          </Button>
          <NavLink exact to = "/blog" className="blog">Blog</NavLink>
          <NavLink exact to = "/" className="signOutBtn">Sign Out</NavLink>
        </Navbar>
      </div>
    );
  }
}

export default App;
