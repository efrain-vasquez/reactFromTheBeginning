import React, { Component } from "react";
import clearInventory from "../actions/clearInventory";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Main extends Component {
  // If you wanted to do more than just pass the data through props, such as some logic
  // then this would be the better way to pass props
  // ClearInventoryAction = () => {
  //   this.props.clearInventory();
  // };

  // If you did decide to do it this way down at the onClick it would be
  // <button onClick={this.clearInventoryAction()}>Clear All Inventory</button>

  render() {
    const frozenQuantity = this.props.frozenData.reduce(
      (accumulator, frozenItem) => accumulator + frozenItem.quantity,
      0
    );
    const meatQuantity = this.props.meatData.reduce(
      (accumulator, meatItem) => accumulator + meatItem.quantity,
      0
    );
    const produceQuantity = this.props.produceData.reduce(
      (accumulator, produceItem) => accumulator + produceItem.quantity,
      0
    );
    return (
      <div>
        {/* The value of these are all coming from the roootReducer properties */}
        <h2>FrozenDept: {frozenQuantity} </h2>
        <h2>MeatDept: {meatQuantity}</h2>
        <h2>ProduceDept:{produceQuantity}</h2>
        <button onClick={this.props.clearInventory}>
          Clear All Inventory!
        </button>
      </div>
    );
  }
}

// before when we used react router without redux the only props we could send down were the router props, and those were limited to what a parent could send down to a child but now with react-redux we can go to the store and access any of the components state and pass it to this component as props from the store.
// all we have to do is import connect and create a mapStateToProps and we can grab anything out of the store that we want.abs
function mapStateToProps(state) {
  return {
    frozenData: state.frozen,
    meatData: state.meat,
    produceData: state.produce,
  };
}

function mapDispatchToProps(dispatch) {
  // this function returns, bindActionCreators
  // and we hand bindActionCreators an object:
  // each property will be a local prop
  // each value will be a function that is dispatch when run
  // 2nd arg for bindActionCreators is the dispatch
  return bindActionCreators(
    {
      //the left hand side is the local property meaning this.props.clearInventory
      //the local variable will be called this.props.clearInventory
      //the right hand side is the function up top: import clearInventory which its value
      //is what is being exported by: '../actions/clearInventory'
      //which is another function that is now made available to this.props.clearInventory
      clearInventory: clearInventory,
    },
    //when a function is connected to the dispatch it is sent to every reducer
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
