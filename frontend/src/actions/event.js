import * as EventAPI from "../util/event_api";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";

export const receiveEvents = payload => ({
  type: RECEIVE_EVENTS,
  events: payload.data,
});

const receiveEvent = payload => ({
  type: RECEIVE_EVENT,
  event: payload.data
});

const receiveErrors = (errors) => ({
  type: RECEIVE_EVENT_ERRORS,
  errors,
});

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
    (err) => dispatch(receiveErrors(err.response.data.noeventsfound))
  );
