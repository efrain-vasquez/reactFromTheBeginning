import React, { Component } from "react";
import "./Home.css";
import SearchBox from "./SearchBox.js";
import Spinner from "../../utility/Spinner/Spinner";
//we are going to need/use axios to make api/server requests so we import it here
import axios from "axios";
import Cities from "../../utility/City/Cities";
import Activities from "../../utility/Activity/Activities";
import Venues from "../../utility/Venue/Venues";

class Home extends Component {
  state = {
    cities: [],
    // because the data comes back as objests we pre-defined them as objects.
    europeCities: {},
    asiaCities: {},
    exoticCities: {},
    activities: [],
    recVenues: {},
  };
  // here we are letting JS know somewhere inside of this function the keyword await is coming that's always what async means. we've got const recommendedCities await, await for what, well wait for this to finish whenever the promise resolves whatever it resolves is going to get stored in the const recommendedCities. we know that axios returns a
  // .data .status code .headers all that stuff we want to see what data actually is so we console.log it.
  async componentDidMount() {
    // const recommendedCities = await axios.get(
    //   `${window.apiHost}/cities/recommended`
    // );
    // console.log(recommendedCities.data);

    //if your having trouble with the function above you can also do it this way. it does exactly the same thing the nice upshot of doing it this way is that we can log the Url this way, which allows us to see the Url that its trying to go to. if you right click on the Url and choose open a new tab that should take you to the Url and you should be able to see the json that way you know you are going into the right place.

    // we can past the Url in over and over where ever its needed but thats not a good idea because you may want to change it, you may want to make your own backend for this someday, or you may need to change the domain for some reason they are many reasons and if you do, you have to change it in every place you used it but if you make a variable you only need to change it in one place. to do this simply go to your indexedDB.html and add a <script>window.apiHost = `https://Url`;</script>
    // since this is just a frontend framework there is no need to use enviromental variables you could also store it in redux or put it in a file and export a bunch of variables in that file, since this is a small app adding it to the indexedDB.html is sufficient.

    // the API gives us access to these routes
    const citiesUrl = `${window.apiHost}/cities/recommended`;
    const europeCitiesUrl = `${window.apiHost}/cities/europe`;
    const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
    const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;
    //console.log(citiesUrl);
    // using await here is not a good solution because we dont want JS to wait for the first one to finish before running the second so what we can do is use promise.all()
    // const recommendedCities = await axios.get(citiesUrl);

    // we start by defining a variable.
    const citiesPromises = [];
    // and each time through or each time we make a request, right here we have got four axios.get() requests and we pass each one a URL that will return a promise, so what we can do is instead of creating this await we can do citiesPromises.push() and we can push that request on because it will return a promise. so citiesPromise now contains four promises which is the result of running all four axios requests and this is awesome because it means JS will issue all four requests and then it will wait for all four of them to finish before it moves on and runs the callback that goes inside of our then.
    citiesPromises.push(axios.get(citiesUrl));
    citiesPromises.push(axios.get(europeCitiesUrl));
    citiesPromises.push(axios.get(asiaCitiesUrl));
    citiesPromises.push(axios.get(exoticCitiesUrl));

    // the key to promise.all() is that you pass promise.all() an array of promises or an iterable of promises.
    // the way data works or the parameter you get in this callback it is the resolved value of each one of these promises and they remain in order regaurdless of when they actually finish JS will preserve the order they are in. So that means if we can console.log by the index and get that element every time.
    Promise.all(citiesPromises).then((data) => {
      // with these const's we can now update the state
      const recommendedCities = data[0].data;
      const europeCities = data[1].data;
      const asiaCities = data[2].data;
      const exoticCities = data[3].data;
      //console.log(recommendedCities.data);
      this.setState({
        cities: recommendedCities,
        europeCities,
        asiaCities,
        exoticCities,
      });
    });

    const activitiesUrl = `${window.apiHost}/activities/today`;
    const activities = await axios(activitiesUrl);
    this.setState({
      // activities starts off as an empty array because state starts it off as an empty array then we do an axios request and our axios response/promise gets back and we overwrite activites with the array from the API
      activities: activities.data,
    });

    const recVenuesUrl = `${window.apiHost}/venues/recommended`;
    const venues = await axios(recVenuesUrl);
    this.setState({
      recVenues: venues.data,
    });
  }

  render() {
    //console.log(this.state.activities);
    // this.state.cities is an array and on component load it will be empty so the length will be 0. thats the only time it will have a length of 0 because after the componentDidMount runs the api will always return something. if the api does not respond you would not get an empty array back you would get a 404 or some other type of server response. which means this will only run before our componentDidMount finishes, so if that happens we will return the spinner component.
    if (this.state.cities.length === 0 || !this.state.recVenues.venues) {
      return <Spinner />;
    } else {
      return (
        // we have two div's now or two elements and we can only return one so to fix this and make JSX happy we can wrap both div's or elements in one div thus allowing us to return only one div or element
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="home col s12">
                <div className="upper-fold">
                  <SearchBox />
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid lower-fold">
            <div className="row">
              <div className="col s12">
                {/* react is a frontend UI and react will never create this component unless it is put into the DOM and rendered, otherwise there is no reason to make it. That is why we have to drop it in here so it will be rendered */}
                <Cities
                  cities={this.state.cities}
                  header="Recommended Cities For You"
                />
              </div>

              <div className="col s12">
                {/* this.state.activities is the data that came back from the API */}
                <Activities
                  activities={this.state.activities}
                  header="Today in your area"
                />
              </div>

              <div className="col s12">
                <Cities
                  cities={this.state.europeCities.cities}
                  header={this.state.europeCities.header}
                />
              </div>

              <div className="col s12">
                <Venues
                  venues={this.state.recVenues.venues}
                  header={this.state.recVenues.header}
                />
              </div>

              <div className="col s12">
                <Cities
                  cities={this.state.asiaCities.cities}
                  header={this.state.asiaCities.header}
                />
              </div>

              <div className="col s12">
                <Cities
                  cities={this.state.exoticCities.cities}
                  header={this.state.exoticCities.header}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Home;
