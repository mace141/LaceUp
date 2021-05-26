import { combineReducers } from 'redux';
import eventsReducer from './events_reducer';
import parksReducer from './parks';
import usersReducer from './users';

const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  parks: parksReducer
});

export default entitiesReducer;