import * as UserAPI from '../util/user_api';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const fetchUser = userId => dispatch => (
  UserAPI.fetchUser(userId).then(
    user => dispatch(receiveUser(user))
  )
);

export const updateUser = user => dispatch => (
  UserAPI.updateUser(user).then(
    user => dispatch(receiveUser(user))
  )
);