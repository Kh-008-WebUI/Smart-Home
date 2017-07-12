import { LOAD_USERS_SUCCESS, UPDATE_USERS_REQUEST, LOAD_USERS_FAILED }
from '../constants/index';

export const loadUsersSuccess = (payload) => {
  return {
    type: LOAD_USERS_SUCCESS,
    payload
  };
};

export const loadUsersFailed = (payload) => {
  return {
    type: LOAD_USERS_FAILED,
    payload
  };
};

export const loadUsersRequest = () => {
  return {
    type: UPDATE_USERS_REQUEST
  };
};
