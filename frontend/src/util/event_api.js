import axios from 'axios';

export const fetchUsersEvents = userId => (
  axios.get(`/api/events/user/${userId}`)
);