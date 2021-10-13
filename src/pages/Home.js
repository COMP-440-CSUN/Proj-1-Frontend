import React from "react";

import {Layout} from '../layout'
import {Get} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'

class App extends React.Component {

  constructor() {
    super();
    this.state = { countries: null };
  }

  async componentDidMount() {
    const data = await Get(ENDPOINTS.HOME)
    this.setState({countries: data.string})
  }
  render() {
    const { countries } = this.state;

    return (
        <div>
          <Layout>
            <h1>MY MESSAGE:</h1>
            <ul>
              {
              countries ?
              countries
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
