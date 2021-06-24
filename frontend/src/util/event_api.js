import axios from "axios";

export const fetchAllEvents = () => {
  return axios.get("/api/events/");
};

export const fetchEventsByUser = (userId) => {
  return axios.get(`/api/events/user/${userId}`);
};

export const fetchEventsByTeam = (teamsId) => {
  return axios.get(`/api/events/team/${teamsId}`);
};

export const fetchEventsByLocation = (locationId) => {
  return axios.get(`/api/events/park/${locationId}`);
};

export const createEvent = (event) => {
  return axios.post("/api/events/create", event);
};

export const updateEvent = event => (
  axios.patch(`/api/events/${event._id}`, event)
);

export const deleteEvent = (eventId) => {
  return axios.delete(`/api/events/delete/${eventId}`);
};

export const fetchUsersEvents = (userId) =>
  axios.get(`/api/events/user/${userId}`);

export const fetchParksEvents = (parkId) =>
  axios.get(`/api/events/park/${parkId}`);

export const fetchEvent = (eventId) => axios.get(`/api/events/${eventId}`);
