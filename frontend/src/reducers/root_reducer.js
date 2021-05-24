import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import entitiesReducer from "./entities";

const RootReducer = combineReducers({
  entities: entitiesReducer,
  session,
  errors,
});

export default RootReducer;
