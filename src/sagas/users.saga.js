import { UPDATE_USERS_REQUEST } from '../actions/loadUsers.action.js';
import { call, put, takeEvery } from 'redux-saga/effects';
import { usersList } from '../api/usersApi';
import { loadUsersSuccess, loadUsersFailed } from '../actions/loadUsers.action';

function* getUsersList () {
  try {
    const currentUsers = yield call(usersList);

    yield put(loadUsersSuccess(currentUsers));
  } catch (e) {
    yield put(loadUsersFailed(e.message));
  }
}

export default function* currentUsersSaga () {
  yield takeEvery('UPDATE_USERS_REQUEST', getUsersList);
}

