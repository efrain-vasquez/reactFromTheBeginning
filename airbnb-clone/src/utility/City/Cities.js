import React from "react";
import City from "./City";
import SlickSlider from "../Slider/Slider";

// the parent which is Home sent down props to Cities the props that were sent down from Home are cities={this.state.cities}
function Cities(props) {
  // here Cities is mapping through cities which are the props from the parent Home and is building a bunch of individual little div's with city components inside of them.
  // take cities pass it down as elements inside of slider and we will have a bunch of city components
  const cities = props.cities.map((city, i) => {
    return (
      <div className="col s3" key={i}>
        <City city={city} />
      </div>
    );
  });
  // we have designed this in such a way that someone else could call SlickSlider and pass a prop of elements and those elements could be anything it doesnt have to be cities it could be anything
  return (
    <div className="cities-wrapper">
      <h1 className="main-header-text">{props.header}</h1>
      <SlickSlider elements={cities} />
    </div>
  );
}

export default Cities;
