import { connect } from "react-redux";
import React from "react";
import { openModal } from "../../actions/modal_actions";
import Splash from "./splash";

// import { fetchEvents } from "../../actions/event_actions";

const mSTP = (state, ownProps) => {
  return {};
};

const mDTP = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    // fetchEvents: () => dispatch(fetchEvents()),
  };
};

export default connect(mSTP, mDTP)(Splash);
