import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        {/* this.props is just the props for the movie component. match is built by the Router. params is an object always available inside of match. and then there will be a property on params for every single wild card that matches this route and the wild card we have established is called /movieId */}
        <Route exact path="/movie/:movieId" component={Movie} />
      </div>
    </Router>
  );
}

export default App;
