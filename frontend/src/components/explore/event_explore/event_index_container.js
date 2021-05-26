import { connect } from "react-redux";
import EventIndex from "./event_index";
import { fetchParksEvents } from "../../../actions/event_actions";
const mapStateToProps = (state, ownProps) => {
  return {
    park: ownProps.park,
    errors: state.errors.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParksEvents: (parkId) => dispatch(fetchParksEvents(parkId)),
    // closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);
