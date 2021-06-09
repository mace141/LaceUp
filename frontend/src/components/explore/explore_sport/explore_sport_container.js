import { connect } from "react-redux";
import ExploreSport from "./explore_sport";
import { fetchAllEvents } from "../../../actions/event_actions";

const mapStateToProps = (state, ownProps) => {
  // debugger;
  // sport: fetch;
  let selectedSport = ownProps.match.path.split("/")[2];
  debugger;
  return {
    events: Object.values(state.entities.events).filter(
      (event) => event.sport.toLowerCase() == selectedSport.toLowerCase()
    ),
    // events: state.entities.events,
    parks: ownProps.parks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processForm: (user) => dispatch(login(user)),
    fetchAllEvents: () => dispatch(fetchAllEvents()),
    // otherForm: () => dispatch(openModal("signup")),
    // closeModal: () => dispatch(closeModal()),
    // login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSport);
