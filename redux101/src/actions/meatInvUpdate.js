// This file is an action creator!
// action creatorsreturn actions
// action is an object that has at Least a property of type
// this action creator is going to be handed to the dispatch
// the action creators are the functions themselves that are handed to the
// bindActionCreators and the actions are the objects that the functions return
export default (quantityChange, index) => {
  //console.log(quantityChange, index);
  return {
    type: "updateMeat",
    payload: {
      quantityChange,
      index,
    },
  };
};
