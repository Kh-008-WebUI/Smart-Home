import {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  DISPLAY_USERS_STATUS,
  LOGIN_SUCCESS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE }
from '../constants/index';

export const users = (state = { users: [],
  loadUsersStatus: '', displayUsersStatus: true, user: {} }, action) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS: {
      return Object.assign(
        {},
        state,
        { users: action.payload },
        { loadUsersStatus: 'DONE' }
      );
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case LOAD_USERS_FAILURE: {
      return Object.assign({}, state, { loadUsersStatus: 'ERROR' });
    }
    case UPDATE_USERS_REQUEST: {
      return Object.assign({}, state, { loadUsersStatus: 'PENDING' });
    }
    case DISPLAY_USERS_STATUS: {
      return Object.assign({}, state, { displayUsersStatus: action.payload });
    }
    case UPDATE_USER_PROFILE_REQUEST: {
      return { ...state, updateProfileStatus: 'PENDING' };
    }
    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, user: action.payload, updateProfileStatus: 'DONE' };
    case UPDATE_USER_PROFILE_FAILURE: {
      return { ...state, updateProfileStatus: 'FAIL' };
    }
    default:
      return state;
  }
};


