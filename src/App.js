import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"


import { Nav } from "./layout";
import {Home, About, Contact, Login} from './pages'


function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/contact">
          <Contact/>
        </Route>
        {
          sessionStorage.getItem("auth") && 
          <Route path="/home">
            <Home/>
          </Route>
        }
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

