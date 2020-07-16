// openClose and content are just placeholders but are tied to the initial state
export default (openClose, content) => {
  // so in our action we are going to send to the dispatcher this action with this type and this payload if action.type === "OPEN_MODAL" is the one that comes through we are going to return this to the piece of state known as the siteModal
  return {
    type: "OPEN_MODAL",
    //openClose and content are just placeholders but are tied to the initial state
    payload: { openClose, content },
  };
};
