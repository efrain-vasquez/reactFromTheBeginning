import React, { Component } from "react";

class StatePractice extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      imageWidth: "",
    };
  }

  inputFocus = () => {
    this.setState({
      message:
        "You have agreed to the site terms of service by filling out the form",
    });
  };

  handleEnter = () => {
    this.setState({
      message: "",
      imageWidth: "",
    });
  };

  imageLoad = (event) => {
    console.dir(event.target);
    if (event.target.width > 100) {
      console.log("Your image is large!");
    }
  };

  render() {
    return (
      <div>
        <input onFocus={this.inputFocus} type="text" />
        <h3 onMouseEnter={this.handleEnter}>{this.state.message}</h3>
        <img
          onLoad={this.imageLoad}
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png"
        />
      </div>
    );
  }
}

export default StatePractice;
