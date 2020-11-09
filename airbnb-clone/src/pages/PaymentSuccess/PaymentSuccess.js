import React, { Component } from "react";

import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";
//import openModal from "../../actions/openModal";
//import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./PaymentSuccess.css";
import moment from "moment";
import { Link } from "react-router-dom";
//import Spinner from "../../utility/Spinner/Spinner";

library.add(faLongArrowAltRight);

class PaymentSuccess extends Component {
  state = {
    reservationDetails: {},
    venueData: {},
    waiting: true,
  };

  async componentDidMount() {
    // once the payment process is done on stripes platform they redirect the user to a new route which is part of our application as well as send a crypted token to our application, but react has no way of decrypting the token so react (frontend) must send the token to the backend to be decrypted. none of the creit information is on the token only the information needed to complete the transaction on the frontend of our application.
    const stripeToken = this.props.match.params.stripeToken;
    const token = this.props.auth.token;
    // the stripeToken is the token the frontend recieved from stripe and the token is the frontends way of letting the backend know which user is logged in so the backend sends the right information to the frontend. if the request is successful you will get back an object with the correct information.
    const data = { stripeToken, token };
    //console.log(data);
    const successUrl = `${window.apiHost}/payment/success`;
    const resp = await axios.post(successUrl, data);
    console.log(resp.data);
    // because componentDidMount is making some asyncronous call, we need to hold up the page while this happens because we dont know how long this is going to happen, and we cant have a white screen and there is a good chance that errors might happen.
    // so what we can do to avoid this is create a variable in the state called waiting and set it to true. while here in the setState we set waiting to false or the spinner will never stop spinning. (see render function)
    this.setState({
      reservationDetails: resp.data.reservationDetails,
      userData: resp.data.userData,
      waiting: false,
    });
  }

  render() {
    if (this.state.waiting) {
      return <spinner />;
    }
    const rd = this.state.reservationDetails;
    console.log(rd);
    const vd = rd.venueData;
    console.log(vd);
    return (
      <div className="reservation-success row">
        <h1 className="col m12 center">Start Packing!</h1>
        <div className="resv-details col s8 offset-s2">
          <div className="confirmed col m12 row">
            <FontAwesomeIcon
              icon="long-arrow-alt-right"
              size="1x"
              color="#ED0000"
            />
            Confirmed: {rd.diffDays} nights in {vd.location}
            <div className="header-text">
              <div>Booked by: {this.props.auth.email}</div>
              <div>{moment().format("MMMM Do, YYYY")}</div>
            </div>
          </div>
          <div className="confirmed-detail row">
            <div className="col m5">
              <div className="bordered col">
                <div className="col m12 upper">
                  <div className="left">Check in</div>
                  <div className="right">Check out</div>
                </div>
                <div className="col m12 lower">
                  <div className="left">
                    {moment(rd.checkIn).format("MMM Do, YYYY")}
                  </div>
                  <div className="right">
                    {moment(rd.checkOut).format("MMM Do, YYYY")}
                  </div>
                </div>
                <div className="col m12 title-text">{vd.title}</div>
                <div className="col m12 details">{vd.details}</div>
              </div>
            </div>

            <div className="col m7">
              <div className="bordered col">
                <div className="col m12 upper charges">
                  <div className="charges-text col m12">Charges</div>
                  <div className="row col m12">
                    <div className="left">
                      ${rd.pricePerNight} x {rd.diffDays} days
                    </div>
                    <div className="right">${rd.totalPrice}</div>
                  </div>
                  <div className="row col m12">
                    <div className="left">Discount</div>
                    <div className="right">$0</div>
                  </div>
                  <div className="row col m12 total">
                    <div className="left">TOTAL</div>
                    <div className="right">${rd.totalPrice}</div>
                  </div>
                </div>
                <div className="col m12 row">
                  To rview or make changes to your reservation in the future,
                  visit your <Link to="/account">account page</Link>.
                </div>
                <div className="col m12 resv-image">
                  <img src={vd.imageUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(PaymentSuccess);
