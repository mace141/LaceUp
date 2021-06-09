import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/post';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_POSTS:
      const posts = action.payload.data;
      return { ...state, ...posts };
    case RECEIVE_POST:
      const post = action.payload.data;
      return { ...state, ...post };
    case REMOVE_POST:
      const newState = { ...state };
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
};

export default postsReducer;