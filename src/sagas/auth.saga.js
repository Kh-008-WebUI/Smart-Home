import { LOGIN_PENDING, REGISTRATION_ATTEMPT } from '../constants/index';
import { login, getRegisterData } from '../api/authenticationApi';
import { loginSuccess,
  loginFailure,
  clearLoginStatus,
  registration,
  registrationPending,
  registrationSuccess,
  registrationFailure } from '../actions/auth.action';
import { delay } from 'redux-saga';
import { all, takeEvery, put, call } from 'redux-saga/effects';

export function* checkLogin (action) {
  try {
    const status = yield call(login, action.user);

    yield put(loginSuccess(status));
    yield delay(2000);
    yield put(clearLoginStatus());
  } catch (e) {
    yield put(loginFailure(false));
    yield delay(2000);
    yield put(clearLoginStatus());
  }
}

export function* register (action) {
  try {
    const registerData = yield call(getRegisterData);

    yield put(registrationSuccess(action.userData));
    yield delay(2000);
    yield put(clearLoginStatus());
  } catch (e) {
    yield put(registrationFailure(e));
    yield delay(2000);
    yield put(clearLoginStatus());
  }
}

export function* watchLogin () {
  yield takeEvery(LOGIN_PENDING, checkLogin);
}

export function* watchRegistration () {
  yield takeEvery(REGISTRATION_ATTEMPT, register);
}
