import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"


import { Nav } from "./layout";
import {Home, About, Contact, Login} from './pages'

const IfTrue = function(boolean)
{
  console.log(boolean)
  if(boolean.boolean && boolean.boolean !== "undefined")
  {
    console.log("hello")
    return (<Route path="/home"><Home/></Route>)
  }
  else
    return (<Route path="/"><Login/></Route>)
}
const Reload = function()
{
  window.location.reload(false)
}

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
        <IfTrue boolean = {sessionStorage.getItem("auth")}/>
      </Switch>
    </Router>
  );
}

export {App, Reload};

