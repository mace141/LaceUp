import { combineReducers } from 'redux';
import eventsReducer from './events';
import usersReducer from './users';

const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer
});

export default entitiesReducer;