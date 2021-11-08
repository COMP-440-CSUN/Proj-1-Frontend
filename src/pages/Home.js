import React from "react";
import {Layout} from '../layout'
import {Get} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'
import axios from 'axios'
import { 
  Button,
  Row, 
  Col,
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
  render() {
    const { data } = this.state;
    const initDB = () => {
      console.log(sessionStorage.getItem("token"))
      axios.get('http://localhost:5000/initializeDB', {}).then(()=> 
      window.alert('Database Initalized')
      );
    }

    return (
        <div className="db-button">
          <h3>This is the Home Page!</h3>
          <Button type="submit" onClick={initDB}>
            Initialize Database
          </Button>
        </div>
    );
  }
}

export default App;
