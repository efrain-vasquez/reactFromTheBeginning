import React from "react";
import { connect } from "react-redux";

class WarmOrNot extends React.Component {
  render() {
    const weather = this.props.weather;
    //There is no weather object
    //We check to see if weather.main exist or not
    //if it does not we put up an h3
    if (!weather.main) {
      //if it does not exist then we return this h3
      return <h3>Fetch the weather to find out if it's warm!</h3>;
    }

    //There is a weather object!
    if (weather.main.temp > 70) {
      return <h3>It's warm!</h3>;
    } else {
      return <h3>It's cold :(</h3>;
    }
  }
}

//we are mapping a piece of redux state called state.weather
//to this components props called weather
function mapStateToProps(state) {
  return {
    // we ar mapping from redux state state.weather to
    // this components props weather
    // state.weather is just the return value of the weatherReducer
    weather: state.weather,
  };
}

export default connect(mapStateToProps)(WarmOrNot);
