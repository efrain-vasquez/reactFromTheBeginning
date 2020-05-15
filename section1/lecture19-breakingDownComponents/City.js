// This is a component this is not an array. The key must be given to the array, which is (Cities) found in the CitiesContainer component.
class City extends React.Component {
  render() {
    return (
      <div className="city">
        <img src={this.props.image} />
        <div className="city-name">{this.props.city.name}</div>
        <div className="city-price">{this.props.city.price}</div>
      </div>
    )
  }
}


