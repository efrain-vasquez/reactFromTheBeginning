import React, { Component } from "react";
import "./activity.css";
import { Link } from "react-router-dom";

class Activity extends Component {
  render() {
    // by destructruing we now have each one of these properties assigned to a variable
    const {
      activityType,
      cost,
      id,
      image,
      rating,
      title,
      totalRatings,
    } = this.props.activity;
    return (
      <div className="activity">
        <Link to={`/activity/${id}`}>
          <img src={image} alt="" />
          <div className="activity-type">{activityType}</div>
          <div className="title">{title}</div>
          <div className="cost">From ${cost}/person</div>
          <div className="rating">
            <i className="material-icons">star</i>
            {rating}({totalRatings})
          </div>
        </Link>
      </div>
    );
  }
}

export default Activity;
