import React, { Component } from "react";
import "./CityVenues.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";
import Venues from "../../utility/Venue/Venues";

class CityVenues extends Component {
  state = {
    venus: [],
    header: "",
  };
  async componentDidMount() {
    const cityName = this.props.match.params.cityName;
    const url = `${window.apiHost}/venues/city/${cityName}`;
    //console.log(url);
    const resp = await axios.get(url, { cityName });
    //console.log(resp.data);
    this.setState({
      venues: resp.data.venues,
      header: resp.data.header,
    });
  }

  render() {
    if (!this.state.header) {
      return <Spinner />;
    }
    // cityName is stored inside this.props.match.params.cityName
    // this.props.match is where the router keeps all matching type stuff
    // and in this case the params is using the cityName that is on App.js file on the Router using <Route path="/city/:cityName" component={CityVenues} />
    return (
      <div className="col s12">
        <Venues venues={this.state.venues} header={this.state.header} />
      </div>
    );
  }
}

export default CityVenues;
