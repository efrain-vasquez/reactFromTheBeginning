import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Home from "./Home";
import Help from "./Help";
import Host from "./Host";
import SignIn from "./SignIn";
import LogIn from "./LogIn";

function App() {
  return (
    <Router>
      <Route path="/" component={NavBar} />
      <Route
        exact
        path="/"
        render={(props) => {
          return (
            <Home title="Hello" history={props.history} match={props.match} />
          );
        }}
      />
      <Route path="/host" component={Host} />
      <Route path="/help" component={Help} />
      <Route path="/login" component={LogIn} />
      <Route path="/signin" component={SignIn} />
    </Router>
  );
}

export default App;
