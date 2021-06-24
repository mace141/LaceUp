import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { createEvent, updateEvent } from "../../util/event_api";
import { openModal, closeModal } from "../../actions/modal_actions";
import EditForm from "./edit_form";
import { fetchParks } from "../../actions/park";
import { receiveEvent } from "../../actions/event_actions";
import { createTeam } from "../../actions/team";

const mapStateToProps = ({ entities: { parks, events, posts}, session, errors }, ownProps) => {
    // const eventId = ownProps.match.params.id;
    return {
        currentuser: session.user,
        // event: events[eventId], 
        errors: errors.event,
        parks,
        // events,
        // event: {
        //     errors: null,
        //     location_id: ownProps.match.params.id,
        //     sport: 'Basketball',
        //     team_size: 1,
        //     num_teams: 1,
        //     skill: "Beginner",
        //     type: "Want to win",
        //     date: "",
        //     time: ""
        // }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editForm: () => dispatch(openModal("editEvent")),
        closeModal: () => dispatch(closeModal()),
        // openModal: (modal) => dispatch(openModal(modal)),
        createEvent: (event) => createEvent(event),
        updateEvent: (event) => updateEvent(event),
        receiveEvent: event => receiveEvent(event),
        fetchParks: () => dispatch(fetchParks()),
        createTeam: team => dispatch(createTeam(team)),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);