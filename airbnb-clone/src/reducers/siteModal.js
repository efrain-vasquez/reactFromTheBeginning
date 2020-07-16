const initState = { openClose: "closed", content: "" };

export default (state = initState, action) => {
  // if this action is the one that comes thru instead of just returning state we are going to return action.payload what is action.payload well its just a pass through from whatever variables were handed off which will be the payload of the action
  // so in our action we are going to send to the dispatcher this action with this type and this payload if action.type === "OPEN_MODAL" is the one that comes through we are going to return this to the piece of state known as the siteModal
  if (action.type === "OPEN_MODAL") {
    return action.payload;
  }
  return state;
};
