class CitiesContainer extends React.Component {
  render() {
    // we use map to build a new array (cities) from the array that we are mapping or iterating through  which is data. The return value of the callback from the map method will be pushed onto the new array (cities).
    const cities = this.props.data.map((city, i) => {
      const randomImage = `http://lorempixel.com/${400 + i}/300/city/`
      return (
        // we return a single DOM element composed of an image a name and price every time we iterate through data onto the new array called (cities). We pass the key as props to City but it is the key given to the cities array. It will be used every time cities is returned at the bottom to create a new instance.
        <City key={i} city={city} image={randomImage} />
      )
    })
    // Finally we return back an array (cities) to whoever asked for the render method which will have been app.js 
    return (
      <div className="row">
        <div className="cities center-align">
          {cities}
        </div>
      </div>
    )
  }
}