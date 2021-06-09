import { connect } from "react-redux";
import React from "react";
import { openModal } from "../../actions/modal_actions";
import { fetchParks } from "../../actions/park";
import { fetchAllEvents } from "../../actions/event_actions";
import Splash from "./splash";

const mSTP = (state, ownProps) => {
  return {};
};

const mDTP = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    fetchParks: () => dispatch(fetchParks()),
    fetchAllEvents: () => dispatch(fetchAllEvents()),
  };
};

export default connect(mSTP, mDTP)(Splash);
