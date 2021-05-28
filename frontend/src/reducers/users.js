import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER, RECEIVE_UPDATED_USER } from '../actions/user';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let id;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      id = action.currentUser.id;
      return { ...state, [id]: action.currentUser };
    case RECEIVE_UPDATED_USER:
      id = action.payload.data._id;
      return { ...state, [id]: action.payload.data };
    case RECEIVE_USER:
      id = action.payload.data[0]._id;
      return { ...state, [id]: action.payload.data[0] };
    default:
      return state;
  }
};

export default usersReducer;