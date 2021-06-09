import axios from 'axios';

export const fetchEventsPosts = eventId => (
  axios.get(`/api/events/${eventId}/posts`)
);

export const createPost = (eventId, post) => (
  axios.post(`/api/posts/${eventId}`, post)
);

export const updatePost = post => (
  axios.patch(`/api/posts/${post._id}`, post)
);

export const deletePost = postId => (
  axios.delete(`/api/posts/${postId}`)
);

