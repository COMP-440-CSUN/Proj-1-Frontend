import React from "react";
import {Get} from '../API/CallAPI'
import {ENDPOINTS} from '../API/Endpoints'

import {
  NavLink
} from "react-router-dom"

const navs = [
  {path: '/contact', name: 'Contact'},
  {path: '/about', name: 'About'},
]

const logout = async e => {
  e.preventDefault();
  const data = Get(ENDPOINTS.LOGOUT);
  window.sessionStorage.setItem("token", data.token)
  window.sessionStorage.setItem("auth", data.auth)
}

const Nav = () => (
  <nav>
    <ul>
      {
        sessionStorage.getItem("auth") && 
        <li>
          <NavLink exact to = "/home" activeClassName="">Home</NavLink>
        </li>
      }
      {navs.map(navItem => (
          <li>
            <NavLink exact to = {navItem.path} activeClassName="">{navItem.name}</NavLink>
          </li>
        ))
      }
      {
        !sessionStorage.getItem("auth") && 
        <li>
          <NavLink exact to = "/" activeClassName="">Login</NavLink>
        </li>
      }
      {
        sessionStorage.getItem("auth") && 
        <li>
          <p onClick={logout} ><NavLink exact to = "/" activeClassName="">Logout</NavLink></p>
        </li>
      }
    </ul>
  </nav>
)

export default Nav;