import React, { Component } from "react";
import "./SignUp.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import Login from "./Login";
import SignUpInputFields from "./SignUpInputFields";
import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      // this is just a piece of JSX that is now going to be put inside of this variable
      //this is the button and when the user clivks on it showinputs will run
      lowerPartOfForm: (
        <button
          type="button"
          onClick={this.showInputs}
          className="sign-up-button"
        >
          Sign up with email
        </button>
      ),
    };
  }

  changeEmail = (e) => this.setState({ email: e.target.value });
  changePassword = (e) => this.setState({ password: e.target.value });

  // showInputs will update the state so lowerPartOfForm will change to the SignUpInputFields component, we are also passing down 2 props
  showInputs = () => {
    this.setState({
      lowerPartOfForm: (
        <SignUpInputFields
          changeEmail={this.changeEmail}
          email={this.state.email}
          changePassword={this.changePassword}
          password={this.state.password}
        />
      ),
    });
  };

  submitLogin = async (e) => {
    e.preventDefault();
    // console.log(this.state.email);
    // console.log(this.state.password);
    if (!this.state.email.includes("@")) {
      return alert("Invalid Email");
    } else {
      //so our SubmitLogin we send up to this URL
      const url = `${window.apiHost}/users/signup`;
      //this data
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      // and whatever we get back we call resp
      const resp = await axios.post(url, data);
      //console.log(resp.data);

      // the data property is just a part of axios, we grab the value of the token property and put it inside of this variable called token
      const token = resp.data.token;
      // this is the token that we send to the backend in this case the API
      console.log(token);

      const url2 = `${window.apiHost}/users/token-check`;
      // we then send that up to url2
      const resp2 = await axios.post(url2, { token });
      //and then we console.log the resp that we get back
      console.log(resp2);
      // this is the decoded token that has been sent back from the backend the API
      console.log(resp2.data);
    }
  };
  render() {
    return (
      // on load of this component this is what will get rendered
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <button className="facebook-login">Connect With Facebook</button>
          <button className="google-login">Connect With Google</button>
          <div className="login-or center">
            <span>or</span>
            <div className="or-divider"></div>
          </div>
          {/* this is the button */}
          {this.state.lowerPartOfForm}
          <div className="divider"></div>
          <div>
            Already have an account?{" "}
            <span
              className="pointer"
              onClick={() => {
                this.props.openModal("open", <Login />);
              }}
            >
              Log in
            </span>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal: openModal,
    },
    dispatcher
  );
}

export default connect(null, mapDispatchToProps)(SignUp);

// this is just a generic function it is not a class so we dont have a this to work with so we dont manage local state either the state will be managed on the SignUp component
// const SignUpInputFields = (props) => {
//   return (
//     <div className="sign-up-wrapper">
//       <div className="col m12">
//         <div className="input-field" id="email">
//           <div className="form-label">Email</div>
//           <input type="text" placeholder="Email" onChange={props.changeEmail} />
//         </div>
//       </div>
//       <div className="col m12">
//         <div className="input-field" id="password">
//           <div className="form-label">Password</div>
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={props.changePassword}
//           />
//         </div>
//       </div>
//       <div className="col m12">
//         <button type="submit" className="btn red accent-2">
//           Sign Up!
//         </button>
//       </div>
//     </div>
//   );
// };
