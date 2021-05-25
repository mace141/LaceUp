import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import entitiesReducer from "./entities";
import ui from "./ui_reducer";

const RootReducer = combineReducers({
  entities: entitiesReducer,
  session,
  errors,
  ui,
});

export default RootReducer;
