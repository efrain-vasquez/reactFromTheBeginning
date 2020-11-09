import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./utility/NavBar/NavBar.js";
import Home from "./pages/Home/Home.js";
import SingleFullVenue from "./pages/SingleFullVenue/SingleFullVenue";
import Modal from "./utility/Modal/Modal";
import CityVenues from "./pages/CityVenues/CityVenues.js";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        {/* we need to get this particular venue :vid from the API */}
        <Route exact path="/venue/:vid" component={SingleFullVenue} />
        {/* this will now render this component which we are getting from up above, and it will render on any page that matches /city/:something */}
        <Route path="/city/:cityName" component={CityVenues} />
        <Route path="/" component={Modal} />
        <Route
          exact
          path="/payment-success/:stripeToken"
          component={PaymentSuccess}
        />
      </Router>
    );
  }
}
export default App;
