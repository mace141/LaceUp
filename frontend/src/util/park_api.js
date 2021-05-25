import axios from 'axios';

export const fetchParks = () => (
  axios.get('/api/parks/')
);
