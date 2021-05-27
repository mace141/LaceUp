import { connect } from "react-redux";
import EventIndex from "./event_index";
import { fetchParksEvents } from "../../../actions/event_actions";
const mapStateToProps = (state, ownProps) => {
  // debugger;

  const eventState = state.entities.events;

  const filteredEvents = Object.fromEntries(
    Object.entries(eventState).filter(
      ([key, value]) => value.location_id === ownProps.park._id
    )
  );
  // debugger;

  return {
    park: ownProps.park,
    errors: state.errors.event,
    parksEvents: filteredEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParksEvents: (parkId) => dispatch(fetchParksEvents(parkId)),
    // closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);
