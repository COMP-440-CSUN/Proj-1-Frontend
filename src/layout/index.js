import React from "react";

import Nav from "./Nav"

const Layout = (props) => (
  <div className="card m-5">
    {props.children}
  </div>
)

export {Layout, Nav};