import { RECEIVE_USER } from '../actions/user';

const eventsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, ...action.user.events };
    default:
      return state;
  }
};

export default eventsReducer;