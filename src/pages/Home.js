import React from "react";
import {Layout} from '../layout'
import {Get} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'
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
    const data = await Get(ENDPOINTS.HOME)
    this.setState({data: data.string})
  }
  render() {
    const { data } = this.state;

    return (
        <div className="db-button">
          <h3>This is the Home Page!</h3>
          <Button type="submit">
            Initialize Database
          </Button>
        </div>
    );
  }
}

export default App;
