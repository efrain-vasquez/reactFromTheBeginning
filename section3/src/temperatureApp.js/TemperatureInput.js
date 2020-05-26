import React, { Component } from "react";

class TemperatureInput extends Component {
  render() {
    const temperature = this.props.temperature;
    const cTemp = this.props.cTemp;
    let style;
    if (cTemp >= 100) {
      style = {
        color: "red",
        backgroundColor: "yellow",
      };
    } else if (cTemp < 100) {
      style = {
        color: "white",
        backgroundColor: "blue",
      };
    }
    return (
      <div>
        <legend style={style}>Enter temperature in {this.props.scale}:</legend>
        <input
          value={temperature}
          onChange={(e) => {
            this.props.handleChange(e, this.props.scale);
          }}
        />
      </div>
    );
  }
}

export default TemperatureInput;
