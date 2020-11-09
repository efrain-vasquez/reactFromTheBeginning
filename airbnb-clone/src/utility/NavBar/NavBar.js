import React, { Component } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
//we need NavBar to know about redux so we are using connect
import { connect } from "react-redux";
// we need NavBar to be able to issue an action to the dispatch so we are going to need bindActionCreators
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import logoutAction from "../../actions/logoutAction";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Login/SignUp";

class NavBar extends Component {
  // this component is going to be on every page because NavBar is on every page
  componentDidUpdate(oldProps) {
    // oldProps.auth.token will be undefined until finally they log in then this statement will be true
    // if the token ever is ever different than it was a second ago close the nodal anywhere on the site
    // what would cause it to be different, when we run this.props.regAction(resp.data) in SignUp component
    if (oldProps.auth.token !== this.props.auth.token) {
      //when this is true we want to close the modal. openModal takes 2 parameters so we give it closed and an empty string for the second parameter
      this.props.openModal("closed", "");
    }
  }

  render() {
    let navColor = "transparent";
    if (this.props.location.pathname !== "/") {
      //then user is on the home page
      navColor = "black";
    }
    return (
      // container fluid makes the div the whole width of the screen or that of the viewport rather than container which will actually cage it and the nav will add some niceities that come with being inside of materialize
      <div className="container-fluid nav">
        <div className="row">
          <nav className={navColor}>
            <div className="nav-wrapper">
              <Link to="/" className="left">
                airbnb
              </Link>
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="/">English (US)</Link>
                </li>
                <li>
                  <Link to="/">$ USD</Link>
                </li>
                <li>
                  <Link to="/">Become a host</Link>
                </li>
                <li>
                  <Link to="/">Help</Link>
                </li>
                {/* NavBar, to (action) openModal, to (reducer which gets updated) siteModal, on the other side of the component tree modal has been watching that piece of state and if props.siteModal.openClose property === "open" then modal will switch to block instead of none otherwise it will stay none.  */}

                {/* both SignUp and LogIn need to be conditionally rendered, we only want those to render if they are not logged in, meaning they dont have a 
                this.props.auth which has a token and email and password. we could go up to the top before the return write an if statement assign a variable and render that variable but something that we see commonly done in react is the use of a conditional statement called a ternary operator. 
                we can not just write an if statement because that is not an exression but we can use a ternary to do a conditional statement  */}
                {this.props.auth.email ? (
                  <div>
                    <li>Hello, {this.props.auth.email}</li>
                    {/* we will do an onClick if someone clicks on it this.props.logoutAction will run which will clear out this.props.auth which means this component will rerender which means this.props.auth will no longer be true and then we will switch back to rendering
                    the next set of <li>'s */}
                    <li
                      onClick={() => {
                        this.props.logoutAction();
                      }}
                    >
                      Logout
                    </li>
                    {/* here all wea re going to do is distroy the json web token because that is the only thing the front end has to communicate with the backend and to let the front end know that you are logged in */}
                  </div>
                ) : (
                  <>
                    <li
                      className="login-signup"
                      // here we have the openModal action which is sending a little bit of data to redux, that data in redux is being stored in the siteModal piece of state.
                      onClick={() => {
                        this.props.openModal("open", <SignUp />);
                      }}
                    >
                      Sign Up
                    </li>
                    {/* NavBar, to (action) openModal, to (reducer which gets updated) siteModal, on the other side of the component tree modal has been watching that piece of state and if props.siteModal.openClose property === "open" then modal will switch to block instead of none otherwise it will stay none.  */}
                    <li
                      className="login-signup"
                      // here we have the openModal action which is sending a little bit of data to redux, that data in redux is being stored in the siteModal piece of state.
                      onClick={() => {
                        this.props.openModal("open", <Login />);
                      }}
                    >
                      Log in
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

// with this function this component can now keep an eye on this particular piece of state, app wide and does not need to know why it changed, who changed it, it just needs to know that it changed.
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

// mapDispatchToProps takes the dispatcher and returns bindActionCreators and bindActionCreators expects an object and the object will have one for one relationship between some action in this file which we will call openMdal and we are going to set that equal to the same name
function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      // this is what the prop will be openModal and it will be set to the same name. now we need to write the action
      openModal: openModal,
      // this action will inform the reducer to clear out this.props.auth
      // which will effectivly log us out
      logoutAction: logoutAction,
    },
    dispatcher
  );
}

// if we are going to use mapDispatchToProps() we need to export this with connect()
// we pass connect two things mapStateToProps and matchDispatchToProps but since we dont have a mapStateToProps we pass null instead.
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
