import { connect } from "react-redux";
import EventIndex from "./event_index";
import { fetchParksEvents } from "../../../actions/event_actions";
import { openModal } from "../../../actions/modal_actions";
const mapStateToProps = (state, ownProps) => {
  const eventState = state.entities.events;

  const filteredEvents = Object.fromEntries(
    Object.entries(eventState).filter(
      ([key, value]) => value.location_id === ownProps.park._id
    )
  );

  return {
    park: ownProps.park,
    errors: state.errors.event,
    parksEvents: filteredEvents,
    isCurrentUser: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParksEvents: (parkId) => dispatch(fetchParksEvents(parkId)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);
