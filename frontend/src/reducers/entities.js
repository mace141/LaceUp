<<<<<<< HEAD
import { combineReducers } from 'redux';
import eventsReducer from './events_reducer';
import parksReducer from './parks';
import usersReducer from './users';
=======
import { combineReducers } from "redux";
import eventsReducer from "./events";
import parksReducer from "./parks";
import usersReducer from "./users";
import teamsReducer from "./teams";
>>>>>>> be_routes_2

const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  parks: parksReducer,
  teams: teamsReducer,
});

export default entitiesReducer;
