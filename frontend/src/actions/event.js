import * as EventAPI from '../util/event_api';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

const receiveEvents = payload => ({
  type: RECEIVE_EVENTS,
  events: payload.data
});

export const fetchUsersEvents = userId => dispatch => (
  EventAPI.fetchUsersEvents(userId).then(
    events => dispatch(receiveEvents(events))
  )
);

