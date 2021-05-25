import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  // debugger
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser.id,
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isAuthenticated: !!action.data.data._id,
        user: action.data.data._id,
        isSignedIn: true,
      };
    default:
      return state;
  }
}
