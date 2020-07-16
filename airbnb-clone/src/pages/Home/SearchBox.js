import React, { Component } from "react";
import "./SearchBox.css";
//import "materialize-css/dist/css/materialize.min.css";
//import M from "materialize-css/dist/js/materialize.min.js";

class SearchBox extends Component {
  state = {
    where: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
  };

  changeWhere = (e) => {
    this.setState({
      where: e.target.value,
    });
  };

  changeCheckIn = (e) => {
    this.setState({
      checkIn: e.target.value,
    });
  };

  changeCheckOut = (e) => {
    this.setState({
      checkOut: e.target.value,
    });
  };

  changeGuests = (e) => {
    this.setState({
      checkOut: e.target.value,
    });
  };

  // componentDidMount() {
  //   let selects = document.querySelectorAll("select");

  //   M.FormSelect.init(selects, {});
  // }

  render() {
    return (
      <div className="home-search-box col m4">
        <h1>Book unique places to stay and things to do.</h1>

        <form className="search-box-form">
          <div className="col m12">
            <div className="form-label">Where</div>
            <div className="input-field" id="where">
              <input
                className="browser-default"
                onChange={this.changeWhere}
                placeholder="AnyWhere"
                value={this.state.where}
                type="text"
              />
            </div>
          </div>

          <div className="col m6">
            <div className="form-label">Check-In</div>
            <div className="input-field" id="check-in">
              <input
                className="browser-default"
                onChange={this.changeCheckIn}
                placeholder="Check-In"
                value={this.state.checkIn}
                type="date"
              />
            </div>
          </div>

          <div className="col m6">
            <div className="form-label">Check-Out</div>
            <div className="input-field" id="check-out">
              <input
                className="browser-default"
                onChange={this.changeCheckOut}
                placeholder="Check-Out"
                value={this.state.checkOut}
                type="date"
              />
            </div>
          </div>

          {/* <div class="input-field col s12">
            <select className="browser-default">
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label></label>
          </div> */}
          <div className="col m12">
            <div className="form-label">Number Of Guests</div>
            <div className="input-field" id="guests">
              <input
                className="browser-default"
                onChange={this.changeGuests}
                placeholder="Number Of Guests"
                value={this.state.guests}
                type="number"
              />
            </div>
          </div>

          <div className="col m12 submit-btn">
            <div className="input-field" id="submit-btn">
              <input
                className="btn-large waves-effect waves-light red accent-2"
                type="submit"
              ></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
