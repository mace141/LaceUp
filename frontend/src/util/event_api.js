import axios from "axios";

export const fetchUsersEvents = (userId) =>
  axios.get(`/api/events/user/${userId}`);

export const fetchParksEvents = (parkId) =>
  axios.get(`/api/events/park/${parkId}`);
