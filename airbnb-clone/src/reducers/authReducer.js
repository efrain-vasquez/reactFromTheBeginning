const initState = {};
export default (state = initState, action) => {
  // this is our authReducer which will be listening for our regAction
  if (action.type === "REGISTER_ACTION") {
    // and if it gets the action type above it will pass on to the rootReducer whatever action.payload which will pass it on to the store
    return action.payload;
  } else if (action.type === "LOGOUT") {
    //this will destroy our redux auth token and that will essentially log us out.
    return initState;
  } else {
    return state;
  }
};
