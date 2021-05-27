import { connect } from "react-redux";
import React from "react";
import { openModal } from "../../actions/modal_actions";
import { fetchParks } from "../../actions/park";
import Splash from "./splash";

// import { fetchEvents } from "../../actions/event_actions";

const mSTP = (state, ownProps) => {
  return {};
};

const mDTP = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    fetchParks: () => dispatch(fetchParks()),
  };
};

export default connect(mSTP, mDTP)(Splash);
