// In a stateless component or presentational/functional component you just go straight to props. In a full state component or a class based component  youre going to use this.props

// React class components are meant to work by encapsulation which means a given object should not only contain all of its own data but should also contain all the methods that change and effect that data. So we try to create these components to be as self sufficient as possible. They carry there data with them they carry there render with them as well as methods too so that ideally you will be able to move these across applications or parts of applications and it should be as seamless as possible.

// This is a functional component
// function Card(props){
//   return (<h1>Sanity Check</h1>
//     )
//   }

// A Class component can not just go straight to returning JSX we have to put it inside a render method and every Class component must have a render method or it has no purpose.
class Card extends React.Component {
  constructor() {
    super();
    console.log("Constructor ran");
  }
  render() {
    return (<div className="col s2">
      <div className="card hoverable small">
        <div className="card-image">
          <img width="300" height="200" src={this.props.data.image} />
        </div>
        <div className="card-content">
          <p>{this.props.data.course}</p>
          <p>{this.props.data.instructor}</p>
        </div>
        <div className="card-action">
          <a href="#">$9.99</a>
        </div>
      </div>
    </div>)
  }
}