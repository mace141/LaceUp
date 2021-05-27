import axios from "axios";

export const fetchTeams = () => axios.get("api/teams");
export const fetchTeam = (teamId) => axios.get(`api/teams/${teamId}`);

export const updateTeam = (team) => {
  const newTeam = { ...team };
  const wildcard = team._id;

  delete newTeam._id;
  return axios.put(`/api/teams/update/${wildcard}`, newTeam);
};
