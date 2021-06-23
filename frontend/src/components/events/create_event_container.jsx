import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { createEvent } from "../../util/event_api";
import { openModal, closeModal } from "../../actions/modal_actions";
import EventForm from "./event_form";
import { fetchParks } from "../../actions/park";
import { receiveEvent } from "../../actions/event_actions";
import { createTeam } from "../../actions/team";

const mapStateToProps = ({ entities: { parks }, session, errors }, ownProps) => {
    return {
        currentuser: session.user,
        errors: errors.event,
        parks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        otherForm: () => dispatch(openModal("newEvent")),
        closeModal: () => dispatch(closeModal()),
        openModal: (modal) => dispatch(openModal(modal)),
        createEvent: (event) =>createEvent(event),
        receiveEvent: event => receiveEvent(event),
        fetchParks: () => dispatch(fetchParks()),
        createTeam: team => dispatch(createTeam(team)),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);