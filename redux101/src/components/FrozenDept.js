import React, { Component } from "react";
//we want this component to know about redux.
// to do that, we need some help... or some glue
// the glue is react-redux, it is our module it is our stand in between redux and react!
// We need the connect function. the component is 100% react the reducer is 100% redux
// and react-redux is the glue that combines them using the connect function
// if a component needs to know about redux you need to use the connect function
import { connect } from "react-redux";
import updateFrozen from "../actions/frozenInvUpdate";
import { bindActionCreators } from "redux";

class FrozenDept extends Component {
  increment = (operation, index) => {
    //console.log(operation, index);
    this.props.updateFrozen(operation, index);
  };

  render() {
    // now we have access to the state of other components without having to move state up
    //instead of the parent sending down the props and doing frozenData={}, we are reaching into the redux store mapping a peice of state in the redux store to this components props
    // we are going to build a bunch of <li> and we are going to stack them on this array called frozenInventory.
    // we are mapping through the redux piece of state but its mapped to the props of this particular component. so we got it out of the redux store and we put it in a prop for this component map through it and build a bunch of <li>
    const frozenInventory = this.props.frozenData.map((item, i) => {
      return (
        //the key goes on the parent element
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
        <h1>Frozen Food Dept!</h1>
        <ul>{frozenInventory}</ul>
      </div>
    );
  }
}

//console.log(connect);
// mapStateToProps takes 1 arg, "state" and that is the rootReducer/Store
function mapStateToProps(state) {
  // mapStateToProps returns an object, with:
  // property is the local prop name to this component
  // meaning whatever we put on the left is what this component will know that thing as
  // value will be the property in the root reducer... ie, a peice of the store
  return {
    // we create a local property to this component: frozenData
    // which is not being sent down from a parent but it is getting it from connect
    // which is getting it from the store
    // What does the store have? Well the store or rootreducer is state.
    // What properties do we have as options in the rootReducer: frozen
    // so if we do state.frozen we get the return value of frozenReducer
    // what is the return value of frozenReducer, it will be state
    // this state comes from frozen.js
    frozenData: state.frozen,
  };
}

// mapDispatchToProps is how we tie our component to the dispatch
// It takes 1 arg: dispatch
// we need to pass the dispatch here because this is how we connect the action
// to the dispatch and the dispatch is how we get the action over to the reducer
function mapDispatchToProps(dispatch) {
  // this function returns, bindActionCreators
  // and we hand bindActionCreators an object:
  // each property will be a local prop
  // each value will be a function that is dispatch when run
  // 2nd arg for bindActionCreators is the dispatch
  return bindActionCreators(
    {
      //the left hand side is the local property meaning this.props.updateFrozen
      //the right hand side is the function up top: import updateFrozen which its value
      //is what is being exported by: '../actions/frozenInvUpdate'
      //which is another function that is now made available to this.props.updateFrozen
      updateFrozen: updateFrozen,
    },
    //when a function is connected to the dispatch it is sent to every reducer
    dispatch
  );
}

//export default FrozenDept;

// The connect function takes 3 args:
// 1.mapStateToProps:
// a. this first one is a function that is going to map a piece of redux state to
// this components props.
// 2nd arg to connect: mapDispatchToProps
// 3rd arg (not always used) to connect: mergeProps

// This is the redux part, lets set up a function that can go fetch something from the redux store and then lets hand it to the component
export default connect(mapStateToProps, mapDispatchToProps)(FrozenDept);

// when a function is run it is fundamentally replaced with whatever the return value is
// example:
// function x(n){
//   return (m)=>{
//     console.log(n+m);
//   }
// }
// x(1)(2);
// connect is returning a function and then it is being handed the param/argument:
// FrozenDept
// now this gives the component FrozenDept access to the props that come from the store, which is the state of frozen.js
