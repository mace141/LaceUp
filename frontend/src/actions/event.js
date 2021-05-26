import * as EventAPI from '../util/event_api';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const receiveEvents = payload => ({
  type: RECEIVE_EVENTS,
  events: payload.data
});

export const fetchUsersEvents = userId => dispatch => (
  EventAPI.fetchUsersEvents(userId).then(
    events => dispatch(receiveEvents(events))
  )
);

