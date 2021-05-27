import * as TeamAPI from "../util/team_api";

export const RECEIVE_TEAMS = "RECEIVE_TEAMS";
export const RECEIVE_TEAM = "RECEIVE_TEAM";

const receiveTeams = (payload) => ({
  type: RECEIVE_TEAMS,
  teams: payload.data,
});

const receiveTeam = (payload) => ({
  type: RECEIVE_TEAM,
  team: payload.data,
});

export const createTeam = team => dispatch => 
  TeamAPI.createTeam(team).then(payload => dispatch(receiveTeam(payload)));

export const fetchTeams = () => (dispatch) =>
  TeamAPI.fetchTeams().then((teams) => dispatch(receiveTeams(teams)));

export const fetchTeam = (teamId) => (dispatch) =>
  TeamAPI.fetchTeam(teamId).then((team) => dispatch(receiveTeam(team)));

export const updateTeam = (team) => (dispatch) =>
  TeamAPI.updateTeam(team).then((team) => dispatch(receiveTeam(team)));

export const addPlayer = (team_id, player_id) => dispatch => 
  TeamAPI.addPlayer(team_id, player_id).then(payload => dispatch(receiveTeam(payload)))