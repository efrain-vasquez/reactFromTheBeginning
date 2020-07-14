import React, { Component } from "react";
import "./SingleFullVenue.css";
import axios from "axios";
import Point from "./Point";
import App from "../../App";

class SingleFullVenue extends Component {
  state = {
    singleVenue: {},
    points: [],
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
  };

  async componentDidMount() {
    // we set up a var and the first thing we need is to grab the venue id out of the URL so the match object is added by the router since the router is rendering this particular page or component it will automatically pass down or add the match object to the props. match comes with params and then vid is going to be associated with whatever we called the wild card over in App.js which is :vid
    const vId = this.props.match.params.vid;
    console.log(vId);
    // now we need to set up our end points, so we make a URL we go and grab the apiHost/venue/whatever the vId we just pulled out is. its a variable so we do a template literal. this will set up the URL to the end point that we are trying to hit. so this const becomes our end point.
    const url = `${window.apiHost}/venue/${vId}`;
    // we do a const and use await we wait for an axios.get() and pass it the url we are not posting any data so we dont have to put anything in the axios request. axios will return a promise, when that promise resolves await will store the resolved value inside axiosResponse
    const axiosResponse = await axios.get(url);
    // we make another const and set it equal to the axiosResponse.data
    // we grab the data property out of the axiosResponse object and put it in singleVenue
    const singleVenue = axiosResponse.data;
    // if we console.log(singleVenue) we see all the info about the particular venue we are on
    //console.log(singleVenue);
    // this is our end point we will hit to get the data from the API
    const pointsUrl = `${window.apiHost}/points/get`;
    // this is our axios / http request that we are making to the API end point
    const pointsAxiosResponse = await axios.get(pointsUrl);
    // singleVenue.points is a string. we do .split on the sommas which will get us an array and every time it runs into a comma there will be a new element in the array, and we will map throught the array. points will always be an array
    const points = singleVenue.points.split(",").map((point, i) => {
      return (
        // instead of passing down a div we are going to pass the Point component, and we will pass down the pointDesc which will be the pointsAxiosResponse which is what we got back from the API and we will also pass down the point itself which will be the point we are on
        <Point key={i} pointDesc={pointsAxiosResponse.data} point={point} />
      );
    });
    this.setState({ singleVenue, points });
  }

  changeNumberOfGuests = (e) => {
    this.setState({ numberOfGuests: e.target.value });
  };
  changeCheckIn = (e) => {
    this.setState({ checkIn: e.target.value });
  };
  changeCheckOut = (e) => {
    this.setState({ checkOut: e.target.value });
  };

  reserveNow = (e) => {
    console.log("User wants to reserve!");
  };

  render() {
    console.log(this.state.singleVenue);
    const sv = this.state.singleVenue;

    return (
      <div className="row single-venue">
        <div className="col s12 center">
          <img src={sv.imageUrl} alt="" />
        </div>
        <div className="col s8 location-details offset-s2">
          <div className="col s8 left-details">
            <div className="location">{sv.location}</div>
            <div className="title">{sv.title}</div>
            <div className="guests">Guests: {sv.guests}</div>

            <div className="divider"></div>

            {this.state.points}

            <div className="details">{sv.details}</div>
            <div className="amenities">{sv.amenities}</div>
          </div>

          <div className="col s4 right-details">
            <div className="price-per-day">
              ${sv.pricePerNight} <span>per day</span>
            </div>
            <div className="rating">{sv.rating}</div>
            <div className="col s6">
              Check-In
              <input
                type="date"
                onChange={this.changeCheckIn}
                value={this.state.checkIn}
              />
            </div>
            <div className="col s6">
              Check-Out
              <input
                type="date"
                onChange={this.changeCheckOut}
                value={this.state.checkOut}
              />
            </div>

            <div className="col s12">
              <select
                className="browser-default"
                onChange={this.changeNumberOfGuests}
                value={this.state.numberOfGuests}
              >
                <option value="1">1 Guests</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
                <option value="7">7 Guests</option>
                <option value="8">8 Guests</option>
                <option value="9">9 Guests</option>
              </select>
            </div>
            <div className="col s12 center">
              <button onClick={this.reserveNow} className="btn red accent-2">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleFullVenue;
