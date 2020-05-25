import React, { Component } from "react";

class StateInAction extends Component {
  constructor() {
    super();
    // You can define state inside the constructor, thats the only time you can use the =
    this.state = {
      text: "State In Action",
    };
    setTimeout(() => {
      // THIS IS BAD!!! DON'T DO THIS! Dont ever setState via an assignment (=), unless  you are in the constructor. Its ok when your initalizing it but you never do it again. The reason for that is because react needs to do a whole bunch of stuff when the state changes. So instead of changing it ourselves we hand it to react and react runs its own method, does a whole bunch of stuff and then will ultimately change it for us.
      // Never do this becasue then react does not know that the state has changed.
      // this.state.text = "State Changed!!";

      // In object oriented programming this is called a setter which is a function whose job is to mutate something else.
      // We always do setState and we hand it an object for each property and then react will mutate the variable for us we dont mutate it.
      // We must use an arrow function inside this callback because the arrow function does not create a new this, so inside of this callback the this will be the same as it was in the class. If we use a regular function instead of an arrow function it will have a new this and that this wont have a setState method which comes from the class.
      this.setState({
        text: "State Changed!!",
      });
    }, 2000);
  }
  render() {
    return (
      <h1>
        {this.state.text} - {this.props.name}
      </h1>
    );
  }
}

export default StateInAction;
