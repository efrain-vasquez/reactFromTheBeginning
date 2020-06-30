const seedData = [
  { food: "lettuce", quantity: 0 },
  { food: "turnipss", quantity: 0 },
  { food: "apples", quantity: 0 },
  { food: "cilantro", quantity: 0 },
];

export default (state = seedData, action) => {
  console.log("produceReducer is running");
  console.log(action);
  if (action.type === "updateProduce") {
    console.log("I care about this action!!!");
    // we never want to mutate statte directly so we make a variable set it equal
    // to an array that is the same as the old state. ... is called destructuring
    // its the same thing as if you had sliced the array and made a completely new
    // copy of the array
    const newState = [...state];
    if (action.payload.operation === "+") {
      newState[action.payload.index].quantity++;
    } else if (action.payload.operation === "-") {
      newState[action.payload.index].quantity--;
    }
    //we are changing newState not old state and then we return newState the new array
    //and then the store will get updated
    return newState;
  } else if (action.type === "clearInventory") {
    let newState = [...state];
    newState.forEach((item, i) => {
      item.quantity = 0;
    });
    return newState;
  } else {
    return state;
  }
};
