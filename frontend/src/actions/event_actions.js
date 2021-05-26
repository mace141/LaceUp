import * as EventAPI from '../util/event_api';

export const RECEIVE_All_EVENTS = 'RECEIVE_ALL_EVENTS';
export const RECEIVE_NEW_EVENT = 'RECEIVE_NEW_EVENT'; 
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const RECEIVE_EVENT_ERRORS = 'RECEIVE_EVENT_ERRORS';
// export const RECEIVE_USER_EVENTS = 'RECEIVE_USER_EVENTS';
// export const RECEIVE_TEAM_EVENTS = 'RECEIVE_TEAM_EVENTS';
// export const RECEIVE_LOCATION_EVENTS = 'RECEIVE_LOCATION_EVENTS';

const receiveAllEvents = events => ({
    type: RECEIVE_All_EVENTS,
    events
});

const receiveNewEvent = event => ({
    type: RECEIVE_NEW_EVENT,
    event
});

const removeEvent = eventId => ({
    type: REMOVE_EVENT,
    eventId
});

const receiveEventErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
})


export const fetchAllEvents = () => (dispatch) => {
    return EventAPI.fetchAllEvents()
    .then((events) => dispatch(receiveAllEvents(events)));
};

export const fetchEventsByUser = (userId) => (dispatch) => {
    return EventAPI.fetchEventsByUser(userId)
        .then((events) => dispatch(receiveAllEvents(events)));
};

export const fetchEventsByTeam = (teamsId) => (dispatch) => {
    return EventAPI.fetchEventsByTeam(teamsId)
        .then((events) => dispatch(receiveAllEvents(events)));
};

export const fetchEventsByLocation = (locationId) => (dispatch) => {
    return EventAPI.fetchEventsByLocation(locationId)
        .then((events) => dispatch(receiveAllEvents(events)));
};

export const createEvent = (event) => (dispatch) => {
    return EventAPI.createEvent(event)
        .then((event) => dispatch(receiveNewEvent(event))),
        (err) => dispatch(receiveEventErrors(err.response.data))
};

export const deleteEvent = (eventId) => (dispatch) => {
    return EventAPI.deleteEvent(eventId)
        .then(() => dispatch(removeEvent(eventId)));
};