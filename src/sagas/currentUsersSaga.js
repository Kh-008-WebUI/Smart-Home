import { UPDATE_CURRENT_USERS } from '../actions/loadUsers.action.js';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from '../api/usersApi';
import { loadUsersSuccess } from '../actions/loadUsers.action';
import 'regenerator-runtime/runtime';
require('babel-polyfill');

function* getUsersList () {
  const currentUsers = yield call(Api);

  yield put(loadUsersSuccess(currentUsers));
}
export default function* currentUsersSaga () {
  yield takeEvery('UPDATE_CURRENT_REQUEST', getUsersList);
}

