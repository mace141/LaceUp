import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { createEvent } from "../../actions/event_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import EventForm from "./event_form";

const mapStateToProps = ({errors}) => {
    return {
        // navLink: <Link to="/event">Event</Link>,
        // currentuser: state.entities.users[state.session.id],
        // currentuser: state.session.user.id,
        // events: state.entities.events,
        errors: errors.event
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        otherForm: () => dispatch(openModal("newEvent")),
        closeModal: () => dispatch(closeModal()),
        createEvent: (event) => dispatch(createEvent(event)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);