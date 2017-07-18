import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_STATUS,
  REGISTRATION_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../constants/index';

export const login = (user) => ({
  type: LOGIN_PENDING,
  user
});

export const clearLoginStatus = () => ({
  type: CLEAR_LOGIN_STATUS
});

export const loginSuccess = (status) => ({ type:LOGIN_SUCCESS, status });

export const loginFailure = (status) => ({ type:LOGIN_FAILURE, status });

export const registration = (userData) => ({
  type: REGISTRATION_ATTEMPT,
  userData
});

export const registrationSuccess = (userData) => ({
  type: REGISTER_SUCCESS,
  userData
});

export const registrationFailure = (status) => ({
  type: REGISTER_FAILURE,
  status
});
