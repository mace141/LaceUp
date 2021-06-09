import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import LogInForm from "./login_form";

const mapStateToProps = ({ session, errors }) => {
  return {
    errors: errors.session,
    formType: "login",
    currentUser: session.user,
    navLink: <Link to="/signup">sign up instead</Link>,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: () => dispatch(openModal("signup")),
    closeModal: () => dispatch(closeModal()),
    login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
