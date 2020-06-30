// All reducers have 2 params:
// 1. Current State, usually provide a default state
// 2. Info that came from any action

const seedData = [
  { food: "TV dinners", quantity: 0 },
  { food: "Frozen Veggies", quantity: 0 },
  { food: "Frozen Pizzas", quantity: 0 },
];

export default (state = seedData, action) => {
  console.log("frozenReducer is running");
  console.log(action);
  //every single time a reducer gets notified its always going to be an action and every
  //action and every action must have a type, so action.type will always be an option to
  //use in our logic
  if (action.type === "updateFrozen") {
    console.log("I care about this action!!!");
    // we never want to mutate statte directly so we make a variable set it equal
    // to an array that is the same as the old state. ... is called destructuring
    // its the same thing as if you had sliced the array and made a completely new
    // copy of the array
    let newState = [...state];
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

//This is another way to write it without ES6
// function frozen(state = [],action){
//     return state;
// }
//export default frozen;
