import { combineReducers } from 'redux';
import eventsReducer from './events_reducer';
import parksReducer from './parks';
import usersReducer from './users';
import teamsReducer from "./teams";

const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  parks: parksReducer,
  teams: teamsReducer,
});

export default entitiesReducer;
