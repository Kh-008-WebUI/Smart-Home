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

    if (status.status === 'error') {
      throw new Error(status.text);
    }

    yield put(loginSuccess(status));
    yield delay(2000);
    yield put(clearLoginStatus());
  } catch (e) {
    yield put(loginFailure(e.message));
  }
}

export function* register (action) {
  try {
    const registerData = yield call(getRegisterData, action.userData);

<<<<<<< HEAD
    if (registerData.status !== 200) {
=======
    if (registerData.status === 'error') {
>>>>>>> 280a7e2fed160558be228209f1be5d5652d0b96f
      throw new Error(registerData.text);
    }

    yield put(registrationSuccess(registerData));
    yield put(clearLoginStatus());
  } catch (e) {
    yield put(registrationFailure(e.message));
  }
}

export function* watchLogin () {
  yield takeEvery(LOGIN_PENDING, checkLogin);
}

export function* watchRegistration () {
  yield takeEvery(REGISTRATION_ATTEMPT, register);
}
