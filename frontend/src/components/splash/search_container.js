import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import Search from "./search";

const mSTP = (state, ownProps) => {
  // debugger;

  return {
    parks: Object.values(state.entities.parks),
  };
};

const mDTP = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    // fetchEvents: () => dispatch(fetchEvents()),
  };
};

export default connect(mSTP, mDTP)(Search);
