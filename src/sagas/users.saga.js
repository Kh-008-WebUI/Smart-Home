import { UPDATE_USERS_REQUEST,
  UPDATE_USER_PROFILE_REQUEST } from '../constants/index';
import { call, put, takeEvery } from 'redux-saga/effects';
import { usersList, updateProfileRequest } from '../api/usersApi';
import { loadUsersSuccess, loadUsersFailed,
  updateProfileSuccess, updateProfileFailed } from '../actions/users.action';

function* getUsersList () {
  try {
    const currentUsers = yield call(usersList);

    yield put(loadUsersSuccess(currentUsers));
  } catch (e) {
    yield put(loadUsersFailed(e));
  }
}

function* updateUserProfile (action) {
  try {
    const updatedProfile = yield call(updateProfileRequest, action.payload);

    yield put(updateProfileSuccess(updatedProfile));
  } catch (e) {
    yield put(updateProfileFailed(e));
  }
}

export function* watchLoadUsers () {
  yield takeEvery(UPDATE_USERS_REQUEST, getUsersList);
}

export function* watchUpdateUserProfile () {
  yield takeEvery(UPDATE_USER_PROFILE_REQUEST, updateUserProfile);
}
