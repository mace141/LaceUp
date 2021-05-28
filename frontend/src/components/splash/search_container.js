import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import Search from "./search";

const mSTP = (state, ownProps) => {
  return {
    parks: Object.values(state.entities.parks),
  };
};

const mDTP = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mSTP, mDTP)(Search);
