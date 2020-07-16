import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Modal.css";
import openModal from "../../actions/openModal";

// Because our Modal is actually in App.js we are going to use redux to display the modal. We are going to use the same Modal through out the entire site we are just going to feed it different content, and so any component at any time it needs to use the modal can open the modal via redux with a redux action and then the modal will be watching redux state and will show itself if its supposed to.

class Modal extends Component {
  state = {};

  closeModal = () => {
    // this will update our reducer in siteModal, which the state will go back to openClose: "close" and the content: "" will go back to an empty String.
    // After the NavBar's onClick was clicked it was switced to open but here we are switching it back to close with an empty ""
    this.props.openModal("closed", "");
    //console.log(this.props.openModal);
  };
  render() {
    // we are using the W3 schools modal
    //this is what is controlling wether or not the modal shows up
    // right now the modalInlineStyle is set to none but when we click on the log in or the sign up button we want to issue an action that action will go out to the reducer and the reducer will update its piece of state, meanwhile the modal will be watching that piece of state and will know when to update/change its modalInlineStyle
    // modal will be watching inside the render function to see if props.siteMOdal ever change then modalInlineStyle will get rerendered.
    let modalInlineStyle;
    // this.props.siteModal.openClose is going to be the value from openClose of siteModal on load it will be closed but when NavBar's onClick gets clicked it will be open
    if (this.props.siteModal.openClose === "open") {
      modalInlineStyle = { display: "block" };
    } else {
      modalInlineStyle = { display: "none" };
    }

    return (
      // we have a site-modal around the outside
      <div className="site-modal" style={modalInlineStyle}>
        {/* modal-content on the inside */}
        <div className="modal-content">
          <div className="col right">
            {/* modal-content also contains this span tag which is the close button */}
            <span onClick={this.closeModal} className="close">
              &times;
            </span>
          </div>
          <div className="">
            {/* the value of this.props.siteModal.content will be the value of content from siteModal */}
            {this.props.siteModal.content}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // so inside modal.js we are going to grab a piece of state and that piece of state we are going to call siteModal and make it equal to siteModal. now we need to go make this file in our reducers folder and add it to our rootReducers file.
  return {
    // we will use the siteModal piece of state in redux to let this component know that it is suppossed to render by changing the display from none to block. the way we are going to tell that piece of state to switch is with the action openModal which can be called from anywhere
    // the onClick found on the NavBar is sending redux a little bit of data which is being stored here on siteModal, and the Modal is keeping an eye on this siteModal so if openClose is true then it will change the display to block otherwise it will change it to none
    siteModal: state.siteModal,
  };
}

function mapDispatchToProps(dispatcher) {
  // bindActionCreators expects an object and the object will have a one for one relationship between some action in this file which we will call openModal and we will set it equal to openModal this is what the prop will be this.props.openModal
  return bindActionCreators({ openModal: openModal }, dispatcher);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
