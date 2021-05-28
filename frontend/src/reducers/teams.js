import { RECEIVE_TEAM, RECEIVE_TEAMS } from "../actions/team";

const teamsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_TEAM:
      //may need  debugging
      nextState[action.team._id] = action.team;
      return nextState;
    case RECEIVE_TEAMS:
      //may need  debugging
      nextState = action.teams;
      return nextState;
    default:
      return state;
  }
};

export default teamsReducer;
