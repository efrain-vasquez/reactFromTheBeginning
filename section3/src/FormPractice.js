import React, { Component, useCallback } from "react";

class FormPractice extends Component {
  constructor() {
    super();
    this.state = {
      // this property needs to be initialized here otherwise it wont be recognized when it is used and thus it will be undefined.
      name: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
    // What we have here is a value property that is attached to every input text thats already kind of managing state for use. In React form elements work differently than other DOM elements because form elements naturally keep some internal state. Because state is changing the value of the input we dont have to do this:
    //const name = document.getElementById("name").value;

    // You can also use e.target and actually traverse the DOM and go down and fetch the value but that is bad that is not good in react because want all mutable state so if any thing is changing about our application we want to control that inside of this.state meaning in the state property of a given component, and we only want it to change with this.setState(). This is because In React mutable state is typically kept in the state property of components and only updated with this.setState(). so you see even though you could fetch the value this way your not supposed to because thats not how React works. React wants to bring the value of the input box and state together meaning the value of the input box is going to be state not the other way around.
    console.log(this.state.name);
  };

  changeName = (e) => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-sm-3">
            <form onSubmit={this.handleSubmit}>
              <input
                // normally the DOM or the browser is managing the value of the input but we are taking that away because in React we want state to be where things are changing and nowhere else.
                // When we call this.changeName the value will NOT change instead changeName will update state and because state changed the value will change also because state changed render will also be run and reflect the new state which is a reflection of a change in value. So render does not show a new change in value but a new change in state. This is the same for the textarea tag and the select tag.
                onChange={this.changeName}
                value={this.state.name}
                type="text"
                id="name"
                placholder="Enter Name"
              />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormPractice;
