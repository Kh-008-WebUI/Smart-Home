import {
  LOAD_USERS_SUCCESS,
  UPDATE_USERS_REQUEST,
  LOAD_USERS_FAILURE,
  DISPLAY_USERS_STATUS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  CLEAR_UPDATE_PROFILE_STATUS,
  CLEAR_DELETE_PROFILE_STATUS,
  DELETE_USER_PROFILE_REQUEST,
  DELETE_USER_PROFILE_SUCCESS,
  DELETE_USER_PROFILE_FAILURE,
  UPDATE_USERS_ONLINE,
  UPLOAD_PHOTO_FAILURE
}
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

export const updateProfileFailed = (errorText) => {
  return {
    type: UPDATE_USER_PROFILE_FAILURE,
    errorText
  };
};

export const clearUpdateProfileStatus = () => {
  return {
    type: CLEAR_UPDATE_PROFILE_STATUS
  };
};

export const updateUsersOnline = (payload) => {
  return {
    type: UPDATE_USERS_ONLINE,
    payload
  };
};

export const deleteUserRequest = (payload) => {
  return {
    type: DELETE_USER_PROFILE_REQUEST,
    payload
  };
};

export const deleteProfileSuccess = (payload) => {
  return {
    type: DELETE_USER_PROFILE_SUCCESS,
    payload
  };
};

export const deleteProfileFailed = (errorText) => {
  return {
    type: DELETE_USER_PROFILE_FAILURE,
    errorText
  };
};

export const clearDeleteProfileStatus = () => {
  return {
    type: CLEAR_DELETE_PROFILE_STATUS
  };
};

export const uploadPhotoFailure = (errorText) => {
  return {
    type: UPLOAD_PHOTO_FAILURE,
    errorText
  };
};
