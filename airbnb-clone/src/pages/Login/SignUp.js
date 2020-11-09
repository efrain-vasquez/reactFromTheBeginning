import React, { Component } from "react";
import "./SignUp.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import regAction from "../../actions/regAction";
import Login from "./Login";
import SignUpInputFields from "./SignUpInputFields";
import axios from "axios";
import swal from "sweetalert";

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
    // if (!this.state.email.includes("@")) {
    //   return alert("Invalid Email");
    // } else {
    // the endpoint we want to hit on our API is /users/signup
    // so our SubmitLogin we send up to this URL that has this end point
    const url = `${window.apiHost}/users/signup`;
    //this data is what we want to post to this URL we sent them via HTTPS so they are safe
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    // we use axios to send the data and whatever we get back we call resp,
    // we can use await rather than having callbacks or promises.
    // we will post to (url) and send (data)
    const resp = await axios.post(url, data);
    //here we can see what we get back
    //console.log(resp.data);

    // the resp sent back from the API has a data property with a property of token in the token what has been saved by the API is the user name and email
    // the data property is just a part of axios, we grab the value of the token property and put it inside of this variable called token
    const token = resp.data.token;
    // this is the token that we send to the backend in this case the API
    console.log(token);
    console.log(resp.data);

    //////////////
    // resp.data.msg could be :
    // - invalidData
    // - userExists
    // - userAdded
    if (resp.data.msg === "userExists") {
      swal({
        title: "Email Exists",
        text: "Please enter another Email Address!",
        icon: "error",
      });
    } else if (resp.data.msg === "invalidData") {
      swal({
        title: "Invalid Email/Password",
        text: "Please enter a valid Email/Password",
        icon: "error",
      });
    } else if (resp.data.msg === "userAdded") {
      swal({
        title: "Success!",
        text: "You have been successfully added!",
        icon: "success",
      });
      // we call our regAction to update our auth reducer!!!
      // we are going to send the whole response from the server not just the token itself
      // this is where we udate Redux with the data that was sent back from the API
      // It starts with the action to the reducer to the root reducer to the store and redux gets updated
      this.props.regAction(resp.data);
    }

    //here we are running a token check just to see whats inside of the token, the API of course will never give you this option or an endpoint with this information
    // const url2 = `${window.apiHost}/users/token-check`;
    // // we then send the token up to url2
    // const resp2 = await axios.post(url2, { token });
    // //and then we console.log the resp that we get back
    // console.log(resp2);
    // // this is the decoded token that has been sent back from the backend the API
    // console.log(resp2.data);
  };
  render() {
    console.log(this.props.auth);
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

// mapStateToProps will give us this.props.auth which is equal to whatever the
// root reducer's state.auth is, which after we log in is going to be whatever
// this.props.regAction(resp.data) was, remember
// we only update our regAction if the sign up was successful
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal: openModal,
      regAction: regAction,
    },
    dispatcher
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

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
