import { combineReducers } from "redux";
import authReducer from "./authReducer";
import siteModal from "./siteModal";

const rootReducer = combineReducers({
  // in our authReducer our auth piece of state is this.props.auth, which is whatever action.payload is which is being sent to the authReducer by regAction. authReducer then sends that to rootReducer so auth is actually action.payload which is actually regObj.
  auth: authReducer,
  siteModal: siteModal,
});

export default rootReducer;
