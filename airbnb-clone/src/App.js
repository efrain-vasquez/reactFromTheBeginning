import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./utility/NavBar/NavBar.js";
import Home from "./pages/Home/Home.js";
import SingleFullVenue from "./pages/SingleFullVenue/SingleFullVenue";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        {/* we need to get this particular venue :vid from the API */}
        <Route exact path="/venue/:vid" component={SingleFullVenue} />
      </Router>
    );
  }
}
export default App;
