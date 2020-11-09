//allactions are functions

// the reason we make regObj an object is because it is easier to add more and more stuff to it as our app grows. its easier to add a property to the object if we make it a string then we have to change either the data type or add a number of parameters.
// regObj is whatever we get back from the API, it gets sent to the dispatcher which will send it to all the reducers who are being monitored by the root reducer who sends the changes to the store
export default (regObj) => {
  return {
    type: "REGISTER_ACTION",
    payload: regObj,
  };
};

// we are going to pass regObj to our authReducer, regAction is just a pass through to our reducer.
