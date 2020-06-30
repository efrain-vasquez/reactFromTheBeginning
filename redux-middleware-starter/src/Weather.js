import React from "react";
// when we see connect we know that we will be doing some redux inside this component
import { connect } from "react-redux";
// when we see bindActionCreators that tells us we will run an action in this component
import { bindActionCreators } from "redux";
// this is the actual action we have
import fetchWeather from "./actions/fetchWeather";
import testThunk from "./actions/testThunk";

class Weather extends React.Component {
  //in react 16 if you dont need the constructor meaning you dont have to do any "this" stuff in it you can go straight to state = {}
  state = { city: "London" };
  changeCity = (e) => {
    this.setState({ city: e.target.value });
  };

  componentDidMount() {
    this.props.testThunk();
  }

  render() {
    console.log(this.props.weather);
    const weather = this.props.weather;
    if (!weather.main) {
      return (
        <div>
          <input
            // this is just sontrolled component stuff
            type="text"
            onChange={this.changeCity}
            value={this.state.city}
          />
          <button
            onClick={() => {
              this.props.fetchWeather(this.state.city);
            }}
          >
            Fetch Weather!
          </button>
        </div>
      );
    }
    return <h3>It's currently {weather.main.temp}</h3>;
  }
}

//This is where we actually get information from the store
//we are mapping redux state to this components props
function mapStateToProps(state) {
  return {
    //this.props.weather is whatever is in the redux store
    weather: state.weather,
  };
}

//This is where we actually interact with the dispatch
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      //this.props.fetchWeather is an action creator thats bound to the dispatch
      // and its going to get fired off
      fetchWeather: fetchWeather,
      testThunk,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
