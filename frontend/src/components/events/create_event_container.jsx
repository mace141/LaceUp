import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { createEvent } from "../../actions/event_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import EventForm from "./event_form";
import { fetchParks } from "../../actions/park";

const mapStateToProps = ({ entities: { parks }, session, errors }, ownProps) => {
    return {
        // navLink: <Link to="/event">Event</Link>,
        // currentuser: state.entities.users[state.session.id],
        currentuser: session.user,
        errors: errors.event,
        parks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        otherForm: () => dispatch(openModal("newEvent")),
        closeModal: () => dispatch(closeModal()),
        createEvent: (event) => dispatch(createEvent(event)),
        fetchParks: () => dispatch(fetchParks())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);