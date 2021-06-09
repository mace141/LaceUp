import * as PostAPI from '../util/post_api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';

const receivePosts = payload => ({
  type: RECEIVE_POSTS,
  payload
});

const receivePost = payload => ({
  type: RECEIVE_POST,
  payload
});

const removePost = postId => ({
  type: REMOVE_POST,
  postId
});

export const fetchPosts = () => dispatch => {
  PostAPI.fetchPosts().then(posts => (
    dispatch(receivePosts(posts))
  ));
};

export const createPost = post => dispatch => {
  PostAPI.createPost(post).then(post => (
    dispatch(receivePost(post))
  ));
};

export const updatePost = post => dispatch => {
  PostAPI.updatePost(post).then(post => (
    dispatch(receivePost(post))
  ));
};

export const deletePost = postId => dispatch => {
  PostAPI.deletePost(postId).then(() => (
    dispatch(removePost(postId))
  ));
};