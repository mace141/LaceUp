import * as ParkAPI from '../util/park_api';

export const RECEIVE_PARKS = 'RECEIVE_PARKS';

const receiveParks = payload => ({
  type: RECEIVE_PARKS,
  parks: payload.data
});

export const fetchParks = () => dispatch => (
  ParkAPI.fetchParks().then(
    parks => dispatch(receiveParks(parks))
  )
);
