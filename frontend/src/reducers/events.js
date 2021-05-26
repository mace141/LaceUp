import { RECEIVE_EVENTS } from '../actions/event';
import { RECEIVE_USER } from '../actions/user';

const eventsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_EVENTS:
      let nextState = { ...state };
      action.events.forEach(e => nextState[e._id] = e);
      return nextState;
    case RECEIVE_USER:
      return { ...state, ...action.user.events };
    default:
      return state;
  }
};

export default eventsReducer;