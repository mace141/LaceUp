import * as EventAPI from '../util/event_api';

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const RECEIVE_EVENT_ERRORS = 'RECEIVE_EVENT_ERRORS';
// export const RECEIVE_USER_EVENTS = 'RECEIVE_USER_EVENTS';
// export const RECEIVE_TEAM_EVENTS = 'RECEIVE_TEAM_EVENTS';
// export const RECEIVE_LOCATION_EVENTS = 'RECEIVE_LOCATION_EVENTS';

const receiveEvents = payload => ({
    type: RECEIVE_EVENTS,
    events: payload.data
});

const receiveEvent = payload => ({
    type: RECEIVE_EVENT,
    event: payload.data
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
    .then((events) => dispatch(receiveEvents(events)));
};

export const fetchEventsByUser = (userId) => (dispatch) => {
    return EventAPI.fetchEventsByUser(userId)
        .then((events) => dispatch(receiveEvents(events)));
};

export const fetchEventsByTeam = (teamsId) => (dispatch) => {
    return EventAPI.fetchEventsByTeam(teamsId)
        .then((events) => dispatch(receiveEvents(events)));
};

export const fetchEventsByLocation = (locationId) => (dispatch) => {
    return EventAPI.fetchEventsByLocation(locationId)
        .then((events) => dispatch(receiveEvents(events)));
};

export const createEvent = (event) => (dispatch) => {
    return EventAPI.createEvent(event)
        .then((data) => dispatch(receiveEvent(data)));
        // (err) => dispatch(receiveEventErrors(err.response.data))
};

export const deleteEvent = (eventId) => (dispatch) => {
    return EventAPI.deleteEvent(eventId)
        .then(() => dispatch(removeEvent(eventId)));
};

export const fetchEvent = eventId => dispatch => (
    EventAPI.fetchEvent(eventId).then(
      event => dispatch(receiveEvent(event))
    )
  );

export const fetchUsersEvents = (userId) => (dispatch) =>
    EventAPI.fetchUsersEvents(userId).then(
        (events) => dispatch(receiveEvents(events))
        // (err) => dispatch(receiveErrors(err.response.data.noeventsfound))
);

export const fetchParksEvents = (parkId) => (dispatch) =>
    EventAPI.fetchParksEvents(parkId).then(
        (events) => dispatch(receiveEvents(events)),
        // (err) => dispatch(receiveErrors(err.response.data.noeventsfound))
);
  