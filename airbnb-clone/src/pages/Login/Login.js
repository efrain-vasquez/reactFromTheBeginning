import React, { Component } from "react";
import "./Login.css";
//we need Login to know about redux so we are using connect
import { connect } from "react-redux";
// we need Login to be able to issue an action to the dispatch so we are going to need bindActionCreators
import { bindActionCreators } from "redux";
//this is our action
import openModal from "../../actions/openModal";
import SignUp from "./SignUp";
import axios from "axios";
import regAction from "../../actions/regAction";
import swal from "sweetalert";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  changeEmail = (e) => this.setState({ email: e.target.value });
  changePassword = (e) => this.setState({ password: e.target.value });

  submitLogin = async (e) => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    const url = `${window.apiHost}/users/login`;
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const resp = await axios.post(url, data);
    const token = resp.data.token;

    // -- noEmail
    if (resp.data.msg === "noEmail") {
      swal({
        title: "That email is not registered.",
        icon: "error",
      });
      // -- badPass
    } else if (resp.data.msg === "badPass") {
      swal({
        title: "Invalid email/password",
        text: "We don't have a match for that user name and password.",
        icon: "error",
      });
      // -- loggedIn
    } else if (resp.data.msg === "loggedIn") {
      swal({
        title: "Success!",
        icon: "success",
      });
      // we call our register action to update our auth reducer!!
      this.props.regAction(resp.data);
    }
  };

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <button className="facebook-login">Connect With Facebook</button>
          <button className="google-login">Connect With Google</button>
          <div className="login-or center">
            <span>or</span>
            <div className="or-divider"></div>
          </div>
          <input
            onChange={this.changeEmail}
            value={this.state.email}
            type="text"
            className="browser-default"
            placeholder="Email address"
          />
          <input
            onChange={this.changePassword}
            value={this.state.password}
            type="password"
            className="browser-default"
            placeholder="Password"
          />
          <button className="sign-up-button">Login</button>
          <div className="divider"></div>
          <div>
            Don't have an account?{" "}
            <span
              className="pointer"
              onClick={() => {
                this.props.openModal("open", <SignUp />);
              }}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    );
  }
}

// inside of login we need access to redux the reason is because we need the openModal action. we need the dispatcher because we are going to need to be able to let redux know inside of this component when they click on SignUp i need to update the siteModal and i do that through the openModal action
function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal: openModal,
      regAction: regAction,
    },
    dispatcher
  );
}

export default connect(null, mapDispatchToProps)(Login);
