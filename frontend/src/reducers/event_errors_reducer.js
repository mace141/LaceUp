import { RECEIVE_EVENT_ERRORS, RECEIVE_EVENTS } from "../actions/event";

const _nullErrors = [];

const EventErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENTS:
      return _nullErrors;
    default:
      return state;
  }
};

export default EventErrorsReducer;
