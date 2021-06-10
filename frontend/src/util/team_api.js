import axios from "axios";

export const fetchTeams = () => axios.get("api/teams");
export const fetchTeam = (teamId) => axios.get(`api/teams/${teamId}`);

export const createTeam = team => axios.post('/api/teams/', team);

export const updateTeam = (team) => {
  const newTeam = { ...team };
  const wildcard = team._id;

  delete newTeam._id;
  return axios.put(`/api/teams/update/${wildcard}`, newTeam);
};

export const addPlayer = (team_id, player_id) => 
  axios.put(`/api/teams/${team_id}/addplayer`, { player_id })