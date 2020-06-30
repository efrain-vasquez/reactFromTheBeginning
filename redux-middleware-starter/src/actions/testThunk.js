export default () => {
  //The value of redux-thunk is we get two args handed to our function here
  //This allows us to manually call the dispatch
  return (dispatch, getState) => {
    setTimeout(() => {
      //console.log("I waited for 2 seconds");
      //we have access to both the entire store and the dispatch inside of our thunk
      const reduxState = getState();
      if (reduxState.weather.main) {
        dispatch({
          type: "testThunk",
        });
      }
      console.log(reduxState);
      //This is manually calling the dispatch in order to send out this thing to all of the reducers
    }, 2000);
  };
};
