import { UPDATE_USERS_REQUEST,
  UPDATE_USER_PROFILE_REQUEST,
  DELETE_USER_PROFILE_REQUEST } from '../constants/index';
import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { usersList,
  updateProfileRequest,
  deleteProfileRequest } from '../api/usersApi';
import { loadUsersSuccess, loadUsersFailed,
  updateProfileSuccess, updateProfileFailed,
  deleteProfileSuccess, deleteProfileFailed,
  clearUpdateProfileStatus } from '../actions/users.action';

function* getUsersList () {
  const { response, error } = yield call(usersList);

  if (response) {
    yield put(loadUsersSuccess(response));
  } else {
    yield put(loadUsersFailed(error.message));
  }
}

function* updateUserProfile (action) {
  const { response, error } = yield call(updateProfileRequest, action.payload);

  if (response) {
    yield put(updateProfileSuccess(response));
    yield delay(2000);
    yield put(clearUpdateProfileStatus());
  } else {
    yield put(updateProfileFailed(error.message));
  }
}

function* deleteUserProfile (action) {
  const { response, error } = yield call(deleteProfileRequest, action.payload);

  if (response) {
    yield put(deleteProfileSuccess(response));
    yield delay(2000);
    yield put(clearUpdateProfileStatus());
  } else {
    yield put(deleteProfileFailed(error.message));
  }
}

export function* watchLoadUsers () {
  yield takeEvery(UPDATE_USERS_REQUEST, getUsersList);
}

export function* watchUpdateUserProfile () {
  yield takeEvery(UPDATE_USER_PROFILE_REQUEST, updateUserProfile);
}

export function* watchDeleteUserProfile () {
  yield takeEvery(DELETE_USER_PROFILE_REQUEST, deleteUserProfile);
}
