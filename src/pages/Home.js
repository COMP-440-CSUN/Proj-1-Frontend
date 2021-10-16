import React from "react";

import {Layout} from '../layout'
import {Get} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'

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
        <div>
          <Layout>
            <h1>MY MESSAGE:</h1>
            <ul>
              {
              data ?
              data
              :
              "no data to display"
            }
            </ul>
          </Layout>
        </div>
    );
  }
}

export default App;
