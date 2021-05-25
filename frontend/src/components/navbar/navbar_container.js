import React from "react";
import { connect } from "react-redux";
import NavBar from "./navbar";
import { openModal } from "../../actions/modal_actions";
import { logout } from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    // currPath: window.location.href,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
