// change this Component to a class! Remember a class does not take parameters so doent need () also remember to use extends React.Compnents
class CatNav extends React.Component {
  constructor() {
    super();
  }
  // get data from props and use map to build an array of <li>


  render() {
    console.log(this.props);
    // this is an array because its the assignment of a map function (which is always an array) that tells us this.
    const navLinks = this.props.data.map((link, i) => {
      // this return goes for the anonymous callback above this line, until eventually map runs out of elements inside of the array of react elements.
      return (
        <li key={i} className="cat-link left valign-wrapper">
          <i className="material-icons">{link.icon}</i>{link.title}
        </li>
      )
    })
    console.log(navLinks);
    return (
      <div className="row">
        <ul className="cat-nav center-align">
          {navLinks}
        </ul>
      </div>
    )
  }
}

