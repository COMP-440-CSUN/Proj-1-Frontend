import React from "react";
import "./styles.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Nav } from "./layout";
import {Home, Login, Register} from './pages'

const IfTrue = function(boolean)
{
  console.log(boolean)
  if(boolean.boolean && boolean.boolean !== "undefined")
  {
    console.log("hello")
    return (<Route path="/home"><Home/></Route>)
  }
  else
  {
    return <div><Route path="/"><Login/></Route></div>
  }
}
const Reload = function()
{
  window.location.reload(false)
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register"><Register/></Route>
        <Route path="/home"><Home/></Route>
        <IfTrue boolean = {sessionStorage.getItem("auth")}/>
      </Switch>
    </Router>
  );
}

export {App, Reload};

