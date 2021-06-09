import axios from 'axios';

export const fetchUser = userId => {
  return axios.get(`/api/users/${userId}`)
};

export const updateUser = user => {
  const newUser = { ...user };
  delete newUser._id

  return axios.patch(`/api/users/${user._id}`, newUser);
};

export const updateUserImage = (userId, formData) => {
  return axios.post(`/api/users/${userId}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};