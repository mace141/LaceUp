import axios from 'axios';

export const fetchUser = userId => {
  return axios.get(`/api/users/${userId}`)
};

export const updateUser = formData => {
  debugger
  return axios.post(`/api/users/${formData.get('user[id]')}`, formData)
};