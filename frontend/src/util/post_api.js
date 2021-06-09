import axios from 'axios';

export const fetchEventsPosts = eventId => (
  axios.get(`/api/${eventId}/posts`)
);

export const createPost = post => (
  axios.post('/api/posts', post)
);

export const updatePost = post => (
  axios.patch(`/api/posts/${post._id}`, post)
);

export const deletePost = postId => (
  axios.delete(`/api/posts/${postId}`)
);

