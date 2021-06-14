import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/post';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_POSTS:
      const posts = action.payload.data;
      posts.forEach(post => newState[post._id] = post);
      return newState;
    case RECEIVE_POST:
      const post = { ...action.payload.data, newPost: true };
      return { ...state, [post._id]: post };
    case REMOVE_POST:
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
};

export default postsReducer;