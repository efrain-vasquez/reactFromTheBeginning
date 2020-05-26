import React, { Component } from "react";
import BoilingVerdict from "./BoilingVerdict";
import TemperatureInput from "./TemperatureInput";

class Calculator extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      temperature: "",
      scale: "",
    };
  }

  handleChange(e, scale) {
    this.setState({
      temperature: e.target.value,
      scale: scale,
    });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;
    let fTemp;
    let cTemp;
    if (scale === "C") {
      //convertcelcius to f
      fTemp = Math.round((temperature * 9) / 5 + 32);
      // We dont need to convert celcius because its already celcius
      cTemp = temperature;
    } else if (scale === "F") {
      //convert to celcius
      cTemp = Math.round(((temperature - 32) * 5) / 9);
      fTemp = temperature;
    }

    return (
      <fieldset>
        <TemperatureInput
          temperature={fTemp}
          cTemp={cTemp}
          scale="F"
          handleChange={this.handleChange}
        />
        <TemperatureInput
          temperature={cTemp}
          cTemp={cTemp}
          scale="C"
          handleChange={this.handleChange}
        />
        <BoilingVerdict celsius={parseFloat(cTemp)} />
      </fieldset>
    );
  }
}

export default Calculator;
