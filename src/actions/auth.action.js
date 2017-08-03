import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_STATUS,
  REGISTRATION_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_LOGGED_USER,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../constants/index';

export const login = (user) => ({
  type: LOGIN_PENDING,
  user
});

export const clearLoginStatus = () => ({
  type: CLEAR_LOGIN_STATUS
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  status: payload.status,
  user: payload.userData
});

export const loginFailure = (errorText) => ({ type:LOGIN_FAILURE, errorText });

export const registration = (userData) => ({
  type: REGISTRATION_ATTEMPT,
  userData
});

export const registrationSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  user: payload.userData
});

export const registrationFailure = (errorText) => ({
  type: REGISTER_FAILURE,
  errorText
});

export const getLoggedUser = () => ({
  type: LOAD_LOGGED_USER
});

export const logout = (user) => ({
  type: LOGOUT_PENDING,
  user
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = (errorText) => ({
  type:LOGOUT_FAILURE,
  errorText
});