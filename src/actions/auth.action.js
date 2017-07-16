import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_STATUS
} from '../constants/index';

export const login = () => ({
  type: LOGIN_PENDING
});

export const clearLoginStatus = () => ({
  type: CLEAR_LOGIN_STATUS
});

export const loginSuccess = (status) => ({ type:LOGIN_SUCCESS, status });

export const loginFailure = (status) => ({ type:LOGIN_FAILURE, status });
