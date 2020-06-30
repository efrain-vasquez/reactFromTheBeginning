import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
// this is the redux-promise middleware
import reduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";

const middleWare = [reduxPromise, reduxThunk];

// The default export is a middleware function. If it receives a promise, it will dispatch the resolved value of the promise. It will not dispatch anything if the promise rejects.

const theStore = applyMiddleware(...middleWare)(createStore)(rootReducer);
// This const above does the same as these 3 const below chained together
// const middlewareApplied = applyMiddleware(reduxPromise)
// const storeWithMiddleWare = middlewareApplied(createStore)
// const finalStore = storeWithMiddleware(rootReducer)

ReactDOM.render(
  <Provider store={theStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
