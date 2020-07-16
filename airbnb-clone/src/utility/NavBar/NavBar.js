import React, { Component } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
//we need NavBar to know about redux so we are using connect
import { connect } from "react-redux";
// we need NavBar to be able to issue an action to the dispatch so we are going to need bindActionCreators
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Login/SignUp";

class NavBar extends Component {
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
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
// mapDispatchToProps takes the dispatcher and returns bindActionCreators and bindActionCreators expects an object and the object will have one for one relationship between some action in this file which we will call openMdal and we are going to set that equal to the same name
function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      // this is what the prop will be openModal and it will be set to the same name. now we need to write the action
      openModal: openModal,
    },
    dispatcher
  );
}

// if we are going to use mapDispatchToProps() we need to export this with connect()
// we pass connect two things mapStateToProps and matchDispatchToProps but since we dont have a mapStateToProps we pass null instead.
export default connect(null, mapDispatchToProps)(NavBar);
