import axios from 'axios';

export const fetchUser = userId => {
  return axios.get(`/api/users/${userId}`)
};

export const updateUser = user => {
  debugger
  const newUser = { ...user };
  const wildcard = user._id;

  delete newUser._id
  return axios.put(`/api/users/update/${wildcard}`, newUser)
};