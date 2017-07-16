import { UPDATE_USERS_REQUEST } from '../constants/index';
import { call, put, takeEvery } from 'redux-saga/effects';
import { usersList } from '../api/usersApi';
import { loadUsersSuccess, loadUsersFailed } from '../actions/users.action';

function* getUsersList () {
  try {
    const currentUsers = yield call(usersList);

    yield put(loadUsersSuccess(currentUsers));
  } catch (e) {
    yield put(loadUsersFailed(e));
  }
}

export default function* currentUsersSaga () {
  yield takeEvery(UPDATE_USERS_REQUEST, getUsersList);
}

