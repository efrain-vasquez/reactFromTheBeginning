import React, { Component } from "react";
import { connect } from "react-redux";
import updateProduce from "../actions/produceInvUpdate";
import { bindActionCreators } from "redux";

class ProduceDept extends Component {
  increment = (operation, index) => {
    //console.log(operation, index);
    this.props.updateProduce(operation, index);
  };
  render() {
    const produceInventory = this.props.produceData.map((item, i) => {
      return (
        <div key={i}>
          <li>
            {item.food}: {item.quantity}
            <input
              type="button"
              onClick={() => {
                this.increment("+", i);
              }}
              value="+"
            />
            <input
              type="button"
              onClick={() => {
                this.increment("-", i);
              }}
              value="-"
            />
          </li>
        </div>
      );
    });
    return (
      <div>
        <h1>Produce Dept!</h1>
        <ul>{produceInventory}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    produceData: state.produce,
  };
}

// mapDispatchToProps is how we tie our component to the dispatch
// It takes 1 arg: dispatch
function mapDispatchToProps(dispatch) {
  // this function returns, bindActionCreators
  // and we hand bindActionCreators an object:
  // each property will be a local prop
  // each value will be a function that is dispatch when run
  // 2nd arg for bindActionCreators is the dispatch
  return bindActionCreators(
    {
      //the left hand side is the local property meaning this.props.updateProduce
      //the right hand side is the function up top: import updateProduce which its value
      //is what is being exported by: '../actions/produceInvUpdate'
      //which is another function that is now made available to this.props.updateProduce
      updateProduce: updateProduce,
    },
    dispatch
  );
}

//export default ProduceDept;

// The connect function takes 3 args:
// 1.mapStateToProps:
// a. this first one is a function that is going to map a piece of redux state to
// this components props.
// 2nd arg to connect: mapDispatchToProps
// 3rd arg (not always used) to connect: mergeProps

// This is the redux part, lets set up a function that can go fetch something from the redux store and then lets hand it to the component
export default connect(mapStateToProps, mapDispatchToProps)(ProduceDept);
