import { LOGIN_PENDING,
  REGISTRATION_ATTEMPT,
  LOAD_LOGGED_USER,
  LOGOUT_PENDING } from '../constants/index';
import { login,
  getRegisterData,
  getUserData,
  logout } from '../api/authenticationApi';
import { loginSuccess,
  loginFailure,
  clearLoginStatus,
  registration,
  registrationPending,
  registrationSuccess,
  registrationFailure,
  getLoggedUser,
  logoutSuccess,
  logoutFailure } from '../actions/auth.action';
import { delay } from 'redux-saga';
import { all, takeEvery, put, call } from 'redux-saga/effects';

export function* checkLogin (action) {
  const { response, error } = yield call(login, action.user);

  if (response) {
    yield put(loginSuccess(response));
    yield delay(2000);
    yield put(clearLoginStatus());
  } else {
    yield put(loginFailure(error.message));
  }
}

export function* register (action) {
  const { response, error } = yield call(getRegisterData, action.userData);

  if (response) {
    yield put(registrationSuccess(response));
    yield delay(2000);
    yield put(clearLoginStatus());
  } else {
    yield put(registrationFailure(error.message));
  }
}

export function* loadUser (action) {
  const { response, error } = yield call(getUserData);

  if (response) {
    yield put(loginSuccess(response));
    yield put(clearLoginStatus());
  } else {
    yield put(loginFailure(error.message));
  }
}

export function* logoutUser (action) {
  const { response, error } = yield call(logout);

  if (response) {
    yield put(logoutSuccess(response));
    yield delay(2000);
    yield put(clearLoginStatus());
  } else {
    yield put(logoutFailure(error.message));
  }
}

export function* watchLogin () {
  yield takeEvery(LOGIN_PENDING, checkLogin);
}

export function* watchRegistration () {
  yield takeEvery(REGISTRATION_ATTEMPT, register);
}

export function* watchLoadUser () {
  yield takeEvery(LOAD_LOGGED_USER, loadUser);
}

export function* watchLogout () {
  yield takeEvery(LOGOUT_PENDING, logoutUser);
}
