const seedData = [
  {
    food: "chicken breast",
    quantity: 0,
  },
  {
    food: "bacon",
    quantity: 0,
  },
  {
    food: "mahi mahi",
    quantity: 0,
  },
  {
    food: "salmon",
    quantity: 0,
  },
];

export default (state = seedData, action) => {
  console.log("meatReducer is running");
  console.log(action);
  if (action.type === "updateMeat") {
    //console.log("I care about this action!!!");
    // we never want to mutate statte directly so we make a variable set it equal
    // to an array that is the same as the old state. ... is called destructuring
    // its the same thing as if you had sliced the array and made a completely new
    // copy of the array
    const newState = [...state];
    const payload = action.payload;
    newState[payload.index].quantity += payload.quantityChange;

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
