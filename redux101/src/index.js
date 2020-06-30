import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// 1. In order to wire up a redux/react app, we need react-redux.
// we need the Provider ReactComponent, to be around everything!
// by placing <App /> inside of the provider
// we can not use react-redux without also using redux
// react-redux is the module that the provider comes from
import { Provider } from "react-redux";
// 2. create the redux store, so that redux exists, and the provider has a store!
// redux does not really exist without a store
// create store comes from redux react-redux does not know about the store,
// until we give the provider the store
import { createStore } from "redux";
// 3. reducers to populate the store
// the store is just an aggregate of the reducers
// 3a. We always start with a rootReducer
// the rootReducer is like a store manager that will import all the other reducers
// 4. make individual reducers to hand to the rootReducer (3)
import rootReducer from "./reducers/rootReducer.js";
// 5. create the store (2) by passing it the root rootReducer, which is made up of the reducers
// rootReducer is the default export of this file: ./reducers/rootReducer.js
const theStore = createStore(rootReducer);

// Provider is the glue between react and redux. Give it the store!
ReactDOM.render(
  <Provider store={theStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
