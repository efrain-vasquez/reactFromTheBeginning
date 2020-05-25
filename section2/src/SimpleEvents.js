import React, { Component, forwardRef } from "react";

class SimpleEvents extends Component {
  handleClick() {
    console.log("Test");
  }
  // When it comes to handling events in React we should know that every event in React comes with an event object that will automatically be passed. That event object comes with a preventDefault method. So the preventDefault will make sure that this event does not do what it normally does which for the browser is to move it forward.
  handleChange() {
    console.log("User Changed the input!");
  }
  handleSubmit(event) {
    console.log("Form Submitted!");
    event.preventDefault();
  }
  render() {
    return (
      <div>
        {/* We dont run code (invoke a function) on the onClick instead what we do is pass code we pass a callback. Instead there are two ways to do this we can create an anonymous function here to run the code. This becomes a function that we are passing we are not running code but passing code, we are sending an anonymous function that runs the code.
           onClick={() => {
             console.log("Test");
           }} 
          What we can also do is pass a function that runs the code such as the example  below. Here we are not running handleClick we are passing handleClick     */}
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

export default SimpleEvents;
