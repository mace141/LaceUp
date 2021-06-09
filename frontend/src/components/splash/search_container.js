import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import Search from "./search";

const mSTP = (state, ownProps) => {
  const sports = [
    "Basketball",
    "Soccer",
    "Football",
    "Tennis",
    "Baseball",
    "Frisbee",
    "Running",
    "Cycling",
    "Volleyball",
    "Workout",
  ];
  return {
    parks: Object.values(state.entities.parks),
    sports: sports,
  };
};

const mDTP = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mSTP, mDTP)(Search);
