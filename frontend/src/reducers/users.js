import { RECEIVE_USERS, RECEIVE_USER, REMOVE_USER } from '../actions/user';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      const { id } = action.user;
      return { ...state, [id]: action.user };
    default:
      return state;
  }
};

export default usersReducer;