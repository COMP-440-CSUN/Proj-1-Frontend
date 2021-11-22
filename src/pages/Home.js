import React from "react";
import {Layout} from '../layout'
import {Get} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'
import axios from 'axios'
import { 
  Button,
  Navbar,
  Container
} from "react-bootstrap";

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
      <Navbar collapseOnSelect fixed='top' bg='dark'>
          <h3 className="navTitle">Home</h3>
          <Button className="initDB" type="submit" onClick={initDB}>
            Initialize Database
          </Button>
          <Button className="newPost" type="submit">
            Add a New Post
          </Button>
      </Navbar>
    );
  }
}

export default App;
