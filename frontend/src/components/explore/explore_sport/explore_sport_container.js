import { connect } from "react-redux";
import ExploreSport from "./explore_sport";
import { fetchAllEvents } from "../../../actions/event_actions";
import { fetchParks } from "../../../actions/park";

const mapStateToProps = (state, ownProps) => {
  // debugger;
  // sport: fetch;
  let selectedSport = ownProps.match.path.split("/")[2];
  return {
    events: Object.values(state.entities.events).filter(
      (event) => event.sport.toLowerCase() == selectedSport.toLowerCase()
    ),
    sport: selectedSport,
    // events: state.entities.events,
    parks: state.entities.parks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processForm: (user) => dispatch(login(user)),
    fetchParks: () => dispatch(fetchParks()),
    fetchAllEvents: () => dispatch(fetchAllEvents()),
    // otherForm: () => dispatch(openModal("signup")),
    // closeModal: () => dispatch(closeModal()),
    // login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSport);
