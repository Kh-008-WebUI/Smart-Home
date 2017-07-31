import { LOAD_USERS_SUCCESS,
  UPDATE_USERS_REQUEST,
  LOAD_USERS_FAILURE,
  DISPLAY_USERS_STATUS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE }
from '../constants/index';

export const loadUsersSuccess = (payload) => {
  return {
    type: LOAD_USERS_SUCCESS,
    payload
  };
};

export const loadUsersFailed = (payload) => {
  return {
    type: LOAD_USERS_FAILURE,
    payload
  };
};

export const loadUsersRequest = () => {
  return {
    type: UPDATE_USERS_REQUEST
  };
};

export const displayUsers = (payload) => {
  return {
    type: DISPLAY_USERS_STATUS,
    payload
  };
};

export const updateProfileRequest = (payload) => {
  return {
    type: UPDATE_USER_PROFILE_REQUEST,
    payload
  };
};

export const updateProfileSuccess = (payload) => {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload
  };
};

export const updateProfileFailed = (payload) => {
  return {
    type: UPDATE_USER_PROFILE_FAILURE,
    payload
  };
};
