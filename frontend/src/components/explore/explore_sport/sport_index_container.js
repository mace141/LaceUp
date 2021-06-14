import { connect } from "react-redux";
import SportIndexItem from "./sport_index_item";

const mapStateToProps = (state, ownProps) => {
  debugger;
  let park;
  if (typeof ownProps.event.location_id == "object") {
    park = ownProps.event.location_id;
  } else {
    park = state.entities.parks[ownProps.event.location_id];
  }
  return {
    event: ownProps.event,
    park: park,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processForm: (user) => dispatch(login(user)),
    // otherForm: () => dispatch(openModal("signup")),
    // closeModal: () => dispatch(closeModal()),
    // login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SportIndexItem);
