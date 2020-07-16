import React from "react";
import SignUp from "./SignUp";
// this is just a generic function it is not a class so we dont have a this to work with so we dont manage local state either the state will be managed on the SignUp component
const SignUpInputFields = (props) => {
  console.log(props);
  return (
    <div className="sign-up-wrapper">
      <div className="col m12">
        <div className="input-field" id="email">
          <div className="form-label">Email</div>
          <input
            type="text"
            placeholder="Email"
            onChange={props.changeEmail}
            value={props.email}
          />
        </div>
      </div>
      <div className="col m12">
        <div className="input-field" id="password">
          <div className="form-label">Password</div>
          <input
            type="current-password"
            placeholder="Password"
            onChange={props.changePassword}
            value={props.password}
          />
        </div>
      </div>
      <div className="col m12">
        <button type="submit" className="btn red accent-2">
          Sign Up!
        </button>
      </div>
    </div>
  );
};

export default SignUpInputFields;
