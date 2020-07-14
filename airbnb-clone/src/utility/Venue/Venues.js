import React, { Component } from "react";
import Venue from "./Venue";
import "./Venue.css";

class Venues extends Component {
  render() {
    const venues = this.props.venues.map((venue, i) => {
      console.log(venue);
      return (
        <div className="col m6 l3" key={i}>
          <Venue venue={venue} key={i} />
        </div>
      );
    });

    return (
      <div className="venues">
        <h1 className="main-header-text">{this.props.header}</h1>
        {venues}
      </div>
    );
  }
}
export default Venues;
