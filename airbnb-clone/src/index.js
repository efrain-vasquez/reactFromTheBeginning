import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Spinner from "./utility/Spinner/Spinner";

// Redux Setup
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer.js";
import reduxPromise from "redux-promise";

// Redux Persist Setup https://github.com/rt2zz/redux-persist
import { persistStore, persistReducer } from "redux-persist";
// this is different from redux persist. if it is not in the redux persist module. if there is no /.. then that means its not a file in our app and so it will go looking in the node modules folder. this doesnt automatically export from redux persist because there are a whole bunch of different options for local storage, so for that reason we have it on a separate line.
//the browser protects every piece of local storage based on domains.
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// if someone refreshes and we have a really big redux store that needs to get repopulated, its going to take some time. PersistGate will allow us to put up a spinner or something while that happens.
import { PersistGate } from "redux-persist/integration/react";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  //State reconcilers define how incoming state is merged in with initial state. It is critical to choose the right state reconciler for your state. autoMergeLevel2 goes 2 levels deep.
  stateReconciler: autoMergeLevel2,
  //this property is to remove anything that you do not want to persist in localstorage. it has an array which will have every piece of redux state or every reducer in redux that should not be included in the refresh or in the hydration of localStorage.
  //example:
  //blacklist: ["siteModal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// we have to go off grid from the documentation of redux persist because our use case senario is using specifically react with redux using applied middleware and the documentation is too generic for this use case senario. first we need to make use of our persistReducer so we will change the rootReducer to persistReducer because persistReducer is already using rootReducer
//const theStore = applyMiddleware(reduxPromise)(createStore)(rootReducer);
//now the store is using persistReducer but we still need to use persistStore
const theStore = applyMiddleware(reduxPromise)(createStore)(persistedReducer);
//we create a variable and give it a value of persistStore and we hand         persistStore the (theStore)
const persistor = persistStore(theStore);

ReactDOM.render(
  //we leave the provider alone because the store is still going to be what it always has been thats how redux persist works
  <Provider store={theStore}>
    {/* but inside PersistGate we are going to hand it a persistor, and then we are going to drop in the persistor that we just made up above, the persistor being persistStore with (theStore), and theStore being our normal store with the persistedReducer in place of the rootReducer, and persistedReducer being persistReducer with our persistConfig and our rootReducer. */}
    {/* when I refresh redux persist which runs at the beginning of our app, in PersistGate, it grabs everything in localstorage and populates our store appropriately. */}
    {/* we can also add a loading attribute to PersistGate. the loading attribute expects a component and it will render that until the persistor has finished hydrating theStore using local storage. if PersistGate takes a minute to load instead of a white screen or an error or whatever the case may be depending upon where react is at, the spinner will load and once PersistGate is finished then the app will load. while its loading you can see the spinner spinning. */}
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// if we go to inspect (left click on mouse) if we go to application and if you choose local storage, your browser protects every piece of local storage based on domains. You may have more stuff in there than what you expect depending on what other developement you may have done. We are running on localhost so this is what will appear on local storage and it will be showing that this is a piece of data inside of the browser, so  essentially like a cookie but it works a little bit differently. This piece of data will show our (auth: which will contain msg, email, and our token) it also contains (siteModal: info) and (persist: info). So thats how its hydrating.
// When we refresh redux persist which bootstraps at the beginnin of our app, at PersistGate on this file, grabs everything in local storage and populates our store appropriately.
