import React, { Component } from "react";

class Modal extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      console.log("Test");
    }, 500);
  }

  // This is a very useful hook that can be used in this lifecyle method for clean up that you need to do if you have a heavy workload or series of network requests in the background.
  componentWillUnmount() {
    console.log("Component is about to be history!!!...");
    clearInterval(this.timer);
  }

  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>{this.props.cityName}</h4>
          <p>
            High:{this.props.high} - Low:{this.props.low}
          </p>
          <p>
            {this.props.weather} <img alt="" src={this.props.iconUrl} />
          </p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
        </div>
      </div>
    );
  }
}

export default Modal;
