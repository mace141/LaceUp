import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import LoginFormContainer from "../user_auth/login_form_container";
import SignupFormContainer from "../user_auth/signup_form_container";
import EditUserFormContainer from '../user_profile/edit_user_form';
import CreateEventContainer from '../events/create_event_container'; 
import EditEventContainer  from '../events/edit_event_container'; 


function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "login":
      component = <LoginFormContainer />;
      break;
    case "signup":
      component = <SignupFormContainer />;
      break;
    case 'editUser':
      component = <EditUserFormContainer/>;
      break;
    case 'newEvent':
      component = <CreateEventContainer />;
      break;
    case 'editEvent':
      component = <EditEventContainer />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
