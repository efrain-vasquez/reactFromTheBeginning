import React, { Component } from "react";

class EventAndState extends Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
    };

    // Another way to maintain the this context of the class is to add a binding in the constructor for this method. What this does is it says anytime inside this particular method you see the this keyword i want you to bind it to the class context.
    //this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    //console.log("Test");
    this.setState({
      inputText: "",
    });
  };
  // When it comes to handling events in React we should know that every event in React comes with an event object that will automatically be passed. That event object comes with a preventDefault method. So the preventDefault will make sure that this event does not do what it normally does which for the browser is to move it forward.

  // In this example we will get an error because here we are trying to access this.state.inputText but the this context is in handleChange and there is no this.state in handleChange's context. When we write the function this way we are creating a new context for this.state.inputText, it is no longer refering to the class context but to this particular method's context of the this keyword.

  // handleChange(event) {
  //   console.log(event.target);
  //   console.log(this.state.inputText);
  // }

  // To solve this problem we can change the function to an arrow function this will
  // keep the class context of the this keyword.

  // handleChange = (event) => {
  //   console.log(event.target);
  //   console.log(this.state.inputText);
  // };

  handleChange = (event) => {
    //console.dir(event.target);

    this.setState({
      inputText: event.target.value,
    });
    console.log(this.state.inputText);
  };

  handleSubmit = (event) => {
    console.log("Form Submitted!");
    this.setState({
      inputText: "State is Cool!",
    });
    event.preventDefault();
  };

  // anytime state changes on a React component render will be called again unless we force it to not render it will always call render again after state has changed.
  render() {
    return (
      <div>
        {/* We dont run code (invoke a function) on the onClick instead what we do is pass code we pass a callback. Instead there are two ways to do this we can create an anonymous function here to run the code. This becomes a function that we are passing we are not running code but passing code, we are sending an anonymous function that runs the code.
           onClick={() => {
             console.log("Test");
           }} 
          What we can also do is pass a function that runs the code such as the example  below. Here we are not running handleClick we are passing handleClick     */}
        <h1>{this.state.inputText}</h1>
        <form onSubmit={this.handleSubmit}>
          <button onClick={this.handleClick} className="btn">
            Click Me!
          </button>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter some text!"
          />
        </form>
      </div>
    );
  }
}

export default EventAndState;
