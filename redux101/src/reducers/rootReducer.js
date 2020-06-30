// This is the root useReducer. It is the store manager for all our reducers.
// To make a rootreducer:
// 1. Get a method from ReactReduxContext, called combinedReducers
import { combineReducers } from "redux";
// 2. Get each individual reducer
import frozenReducer from "./frozenReducer.js";
import produceReducer from "./produceReducer.js";
import meatReducer from "./meatReducer.js";

// 3. Call combineReducers and hand it an Object
// Each key in combinedReducers will be  a piece of state in the redux store
// Each value, will be areducer and that value will return a peicee of state in the redux store
// the rootReducer does not collect any state on its own or return any state on its own
// it simply collects all of the individual reducers
// the rootreducer is simply put the return value of all the reducer functions
const rootreducer = combineReducers({
  // the rootReducer is the result of calling combinedReducers
  // and handing it a key value pair and each key will
  // be what the state is going to be called in the store
  // and the value will be that particular reducer which in this case is frozenReducer
  frozen: frozenReducer,
  produce: produceReducer,
  meat: meatReducer,
});

export default rootreducer;
