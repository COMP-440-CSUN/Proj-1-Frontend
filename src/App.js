import React from "react";
import "./styles.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import {Home, Login, Register } from './pages'

const IfTrue = function(auth)
{
  console.log(auth)
  if(auth == "loggedIn" && auth !== "undefined")
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
        <IfTrue auth = {sessionStorage.getItem("auth")}/>
      </Switch>
    </Router>
  );
}

export {App, Reload};

