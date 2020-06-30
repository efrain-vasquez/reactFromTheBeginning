// This file is an action creator!
// action creatorsreturn actions
// action is an object that has at Least a property of type
// this action creator is going to be handed to the dispatch
// the action creators are the functions themselves that are handed to the
// bindActionCreators and the actions are the objects that the functions return
export default (operation, index) => {
  console.log(operation, index);
  return {
    type: "updateProduce",
    payload: {
      operation,
      index,
    },
  };
};
