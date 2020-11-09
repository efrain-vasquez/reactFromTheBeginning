import React, { Component } from "react";
import "./SingleFullVenue.css";
import axios from "axios";
import Point from "./Point";
import { connect } from "react-redux";
import openModal from "../../actions/openModal";
import { bindActionCreators } from "redux";
import Login from "../Login/Login";
import moment from "moment";
import swal from "sweetalert";
import loadScript from "../../utility/utilityFunctions/loadScript";

class SingleFullVenue extends Component {
  state = {
    singleVenue: {},
    points: [],
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
  };

  async componentDidMount() {
    // we set up a var and the first thing we need is to grab the venue id out of the URL so the match object is added by the router since the router is rendering this particular page or component it will automatically pass down or add the match object to the props. match comes with params and then vid is going to be associated with whatever we called the wild card over in App.js which is :vid
    const vId = this.props.match.params.vid;
    console.log(vId);
    // now we need to set up our end points, so we make a URL we go and grab the apiHost/venue/whatever the vId we just pulled out is. its a variable so we do a template literal. this will set up the URL to the end point that we are trying to hit. so this const becomes our end point.
    const url = `${window.apiHost}/venue/${vId}`;
    // we do a const and use await we wait for an axios.get() and pass it the url we are not posting any data so we dont have to put anything in the axios request. axios will return a promise, when that promise resolves await will store the resolved value inside axiosResponse
    const axiosResponse = await axios.get(url);
    // we make another const and set it equal to the axiosResponse.data
    // we grab the data property out of the axiosResponse object and put it in singleVenue
    const singleVenue = axiosResponse.data;
    // if we console.log(singleVenue) we see all the info about the particular venue we are on
    //console.log(singleVenue);
    // this is our end point we will hit to get the data from the API
    const pointsUrl = `${window.apiHost}/points/get`;
    // this is our axios / http request that we are making to the API end point
    const pointsAxiosResponse = await axios.get(pointsUrl);
    // singleVenue.points is a string. we do .split on the sommas which will get us an array and every time it runs into a comma there will be a new element in the array, and we will map throught the array. points will always be an array
    const points = singleVenue.points.split(",").map((point, i) => {
      return (
        // instead of passing down a div we are going to pass the Point component, and we will pass down the pointDesc which will be the pointsAxiosResponse which is what we got back from the API and we will also pass down the point itself which will be the point we are on
        <Point key={i} pointDesc={pointsAxiosResponse.data} point={point} />
      );
    });
    this.setState({ singleVenue, points });
  }

  changeNumberOfGuests = (e) => {
    this.setState({ numberOfGuests: e.target.value });
  };
  changeCheckIn = (e) => {
    this.setState({ checkIn: e.target.value });
  };
  changeCheckOut = (e) => {
    this.setState({ checkOut: e.target.value });
  };

  reserveNow = async (e) => {
    //console.log("User wants to reserve!");
    const startDayMoment = moment(this.state.checkIn);
    //console.log(startDayMoment);
    const endDayMoment = moment(this.state.checkOut);
    //console.log(endDayMoment);
    const diffDays = endDayMoment.diff(startDayMoment, "days");
    console.log(diffDays);
    if (diffDays < 1) {
      //check in date must be before check out date
      swal({
        title: "Check out date must be after check in date",
        icon: "error",
      });
    } else if (isNaN(diffDays)) {
      //bad date
      swal({
        title: "Please make sure your dates are valid",
        icon: "error",
      });
    } else {
      //diff days are a valid number
      const pricePerNight = this.state.singleVenue.pricePerNight;
      const totalPrice = pricePerNight * diffDays;
      //console.log(totalPrice);

      //this is an external JavaScript file that lives out on the internet, which we see this same thing on our HTML file in the public folder. we put this here because we dont use this file throughtout our application only those who make payments need to use it so we can add it here on the fly. we dont want to save stripe to the local hard drive because stripe constantly keeps updating security so we want the most recent version which will always be there version. That is why we save this file here.
      //when we added this script tag the stripe object was added to the global scope. this happens down below when this coe is run:
      //const stripe = window.Stripe(stripePublicKey);

      const scriptUrl = "https://js.stripe.com/v3";
      const stripePublicKey =
        "pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT";

      // //moving the below code to its own module
      // //we are defining our own promise to wait for, normally in componentDidMount we use await with axios because axios returns a promise but in our case here we are going to make our own promise because we are not using someone elses API. The way that it works is await says i will not go any farther, meaning no code below this line can run until this callback runs resolve.
      // await new Promise((resolve, reject) => {
      //   //this is just an old school JavaScript way of creating a script tag like we do in the HTML file but we are using JavaScript to do it.
      //   const script = document.createElement("script");
      //   script.type = "text/javascript";
      //   //so here we are setting the src attribute to scriptUrl
      //   script.src = scriptUrl;
      //   //we are adding an onload listener to our script and once its finished loading the resolve will run once the resolve runs the await will let go of the lock and stripe will run.
      //   script.onload = () => {
      //     console.log("The script has loaded");
      //     resolve();
      //   };
      //   //here we are going to grab the head and the first child cause theres actually only one thing with the tag of head but still grab it. So go out to the head and append it the script which is essentially the same thing as telling JavaScript: <script type="text/javascript" src="https://js.stripe.com/v3"></script>
      //   //this code will cause the script tag to be dynamically added to the head. the script tag is not part of the site but when this code is run it becomes dynamically part of it.
      //   //what we need to happen is we need our resolve to run but not until the script tag has been added to the head.
      //   document.getElementsByTagName("head")[0].appendChild(script);
      //   console.log("The script has been added to the head");
      // });
      // //what we need to happen is we need our resolve to run but not until the script tag has been added to the head. the script.onload() function which is an onload listener will prevent stripe from running till the resolve finishes running. once resolve runs the await will let go of the lock and stripe will run.
      await loadScript(scriptUrl); //wait for this to load we dont need a variable we just need to wait. most times we are waiting for a response like in an axios request in this case we dont need to actually know anything we dont need any information we just need to know that the script is done loading
      // console.log("Lets run some stripe"); this assures us that our users will never have to load stripe unless they come to this page and run this code.
      //we pass the stripe public key to the Stripe object
      //we are going to use the stripe variable to redirect the user to a check out. before we do that we need data that the user has entered.
      //this const stripe is now is associated with my PublicKey
      const stripe = window.Stripe(stripePublicKey);
      //our endpoint is /payment/create-session
      const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
      //this covers all the data the user needs to input so the application can get Stripe ready to process the users payment.
      //this data is going to be sent to the backend
      const data = {
        venueData: this.state.singleVenue,
        totalPrice,
        diffDays,
        pricePerNight,
        checkIn: this.state.checkIn,
        checkOut: this.state.checkOut,
        token: this.props.auth.token,
        currency: "USD",
      };
      //this needs to be a post because we are going to send data through the body.
      //we are not using stripe yet right now we are just getting ready everything so we can create the stripe token.
      //this const sessionVar now knows about my private key
      //this is the data being sent to the backend:
      //await axios.post(stripeSessionUrl, data)
      //then the backend sends the user a token: const sessionVar
      //which the user sends to stripe down below
      const sessionVar = await axios.post(stripeSessionUrl, data);
      //console.log(sessionVar.data);

      //what happens in this payment process is we give the session variable to the user:
      //const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
      //this stripesessionVariable tells the user that stripe knows the information the user entered, stripe also knows the applications private key and the users public key it knows they are associated.
      //by running this line of code:
      //const sessionVar = await axios.post(stripeSessionUrl, data);
      //the application sends the key back to the user and the user is now going to send that key: sessionVar.data.id and send it up to Stripe using this redirect to checkout.

      // when the user hits reserve the application sends a request to the server the server sends back the sessionVar then it takes that sessionVar and send it on to stripe and just like that we get an awesome checkout. When this happens if we look up at the URL we are no longer on the applications react site we are on stripe's site, this is a good thing because we dont want the responsibility or anything to do with this checkout process. we are running in test mode not live mode. stripe also knows what type of payment you are willing to accept on your backend such as paypal, cedit card, google pay, etc...  the only valid credit card number you can put in the card field is 4242etc.. because we are in test mode. experation date can be any date in the future the CVC number can be any three digit number. once the payment is successful it takes us back to local host 3000 and then there is a huge token.
      //this returns a promise
      stripe
        //when stripe recieves the token from the user it forwards the user to the checkout, this same token tells stripe hey when the checkout is complete send the user to this URL: http://localhost:3000/payment-success/:token
        //this stripe token has all the information we need not the users credit information but just the information that tells the application the payment was successful.
        .redirectToCheckout({
          //inside here we put an object and in this object we put the id property which is what stripe really wants from us so its the only thing we really need to post
          sessionId: sessionVar.data.id,
        })
        .then((result) => {
          //the result is the respone from stripe
          console.log(result);
          //the only time this will run is if the network fails, such as if the internet connection drops and pops back up or if the payment does not go through due to network problems
        });
    }
  };

  render() {
    console.log(this.props.auth);
    console.log(this.state.singleVenue);
    const sv = this.state.singleVenue;

    return (
      <div className="row single-venue">
        <div className="col s12 center">
          <img src={sv.imageUrl} alt="" />
        </div>
        <div className="col s8 location-details offset-s2">
          <div className="col s8 left-details">
            <div className="location">{sv.location}</div>
            <div className="title">{sv.title}</div>
            <div className="guests">Guests: {sv.guests}</div>

            <div className="divider"></div>

            {this.state.points}

            <div className="details">{sv.details}</div>
            <div className="amenities">{sv.amenities}</div>
          </div>

          <div className="col s4 right-details">
            <div className="price-per-day">
              ${sv.pricePerNight} <span>per day</span>
            </div>
            <div className="rating">{sv.rating}</div>
            <div className="col s6">
              Check-In
              <input
                type="date"
                onChange={this.changeCheckIn}
                value={this.state.checkIn}
              />
            </div>
            <div className="col s6">
              Check-Out
              <input
                type="date"
                onChange={this.changeCheckOut}
                value={this.state.checkOut}
              />
            </div>

            <div className="col s12">
              <select
                className="browser-default"
                onChange={this.changeNumberOfGuests}
                value={this.state.numberOfGuests}
              >
                <option value="1">1 Guests</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
                <option value="7">7 Guests</option>
                <option value="8">8 Guests</option>
              </select>
            </div>
            <div className="col s12 center">
              {this.props.auth.token ? (
                <button onClick={this.reserveNow} className="btn red accent-2">
                  Reserve
                </button>
              ) : (
                <div>
                  You must{" "}
                  <span
                    className="text-link"
                    // here we have the openModal action which is sending a little bit of data to redux, that data in redux is being stored in the siteModal piece of state.
                    onClick={() => {
                      this.props.openModal("open", <Login />);
                    }}
                  >
                    <button>Log In</button>
                  </span>{" "}
                  to reserve!
                </div>
              )}
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

// mapDispatchToProps expects the dispatch as an argument
// and we return bindActionCreators which is a function that expects an object

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue);
