import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS, RECEIVE_USER, REMOVE_USER } from '../actions/user';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let id;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      id = action.currentUser.id;
      return { ...state, [id]: action.currentUser };
    case RECEIVE_USER:
      id = action.user._id;
      return { ...state, [id]: action.user };
    default:
      return state;
  }
};

export default usersReducer;