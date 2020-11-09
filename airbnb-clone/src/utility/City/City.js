import React, { Component } from "react";
import "./City.css";
import { Link } from "react-router-dom";

class City extends Component {
  render() {
    //console.log(this.props.city);
    // deconstruction in es6 means we can extract data from arrays and objects and assign them to variables
    const { cityName, image, price, id } = this.props.city;
    return (
      <div className="city col s12">
        <Link to={`/city/${cityName}`}>
          <div className="image">
            <img src={image} alt="" />
          </div>
          <div className="city-name">{cityName}</div>
          <div className="price">${price}/night average</div>
        </Link>
      </div>
    );
  }
}

export default City;
