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
  const status = yield call(login, action.user);

  if (status.status === true) {
    yield put(loginSuccess(status));
    yield delay(2000);
    yield put(clearLoginStatus());
  } else {
    yield put(loginFailure(status.message));
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
  try {
    const user = yield call(getUserData);


    yield put(loginSuccess(user));
    yield delay(2000);
    yield put(clearLoginStatus());
  } catch (e) {
    yield put(clearLoginStatus());
  }
}

export function* logoutUser (action) {
  try {
    const user = yield call(logout);

      if (user.status === 'error') {
        throw new Error(user.text);
      }

      yield put(logoutSuccess(user));
      yield delay(2000);
      yield put(clearLoginStatus());
  } catch (e) {
    yield put(logoutFailure(e.message));
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
