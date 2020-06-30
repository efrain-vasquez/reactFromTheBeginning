import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/main">Entire Store</NavLink>
            <NavLink to="produce-dept">Produce Department</NavLink>
            <NavLink to="meat-dept">Meat Department</NavLink>
            <NavLink to="frozen-dept">Frozen Department</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
