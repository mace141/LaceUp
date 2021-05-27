import * as UserAPI from '../util/user_api';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_UPDATED_USER = 'RECEIVE_UPDATED_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const receiveUser = payload => ({
  type: RECEIVE_USER,
  payload
});

const receiveUpdatedUser = payload => ({
  type: RECEIVE_UPDATED_USER,
  payload
});

export const fetchUser = userId => dispatch => (
  UserAPI.fetchUser(userId).then(
    user => dispatch(receiveUser(user))
  )
);

export const updateUser = user => dispatch => (
  UserAPI.updateUser(user).then(
    user => dispatch(receiveUpdatedUser(user))
  )
);