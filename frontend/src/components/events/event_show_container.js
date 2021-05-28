import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchEvent } from "../../actions/event_actions";
import { fetchParks } from "../../actions/park";
import { fetchTeams } from "../../actions/team";
import { fetchUser } from "../../util/user_api";
import EventShow from "./event_show";

const mapSTP = (state, ownProps) => {
  // debugger;
  return {
    event: state.entities.events[ownProps.match.params.id],
    teams: Object.values(state.entities.teams).filter(
      (team) => team.event_id == ownProps.match.params.id
    ),
  };
};

const mapDTP = (dispatch) => ({
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
  fetchParks: () => dispatch(fetchParks()),
  fetchUser: (userId) => fetchUser(userId),
  fetchTeams: () => dispatch(fetchTeams()),
});

const EventShowContainer = withRouter(connect(mapSTP, mapDTP)(EventShow));

export default EventShowContainer;
