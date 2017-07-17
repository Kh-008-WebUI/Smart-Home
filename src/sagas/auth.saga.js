import { LOGIN_PENDING } from '../constants/index';
import { login } from '../api/authenticationApi';
import { loginSuccess,
  loginFailure,
  clearLoginStatus } from '../actions/auth.action';
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

export function* watchLogin () {
  yield takeEvery(LOGIN_PENDING, checkLogin);
}
