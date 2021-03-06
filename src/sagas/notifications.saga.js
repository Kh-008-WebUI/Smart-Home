import { call, put, takeEvery } from 'redux-saga/effects';
import { getNotifications,
         addNotifications,
         changeAllStatus,
         showAllHistory,
        changeStatus } from '../api/notificationsApi';
import { fetchNotificationsSuccess,
         fetchNotificationsFailed,
        addNotificationsSuccess,
        changeStatusNotificationSuccess
       }
from '../actions/notifications.action';
import { NOTIFICATIONS_FETCH_REQUESTED,
         NOTIFICATIONS_CHANGE_STATUS,
         SEND_NOTIFICATION_WS,
         ADD_NOTIFICATIONS,
         NOTIFICATIONS_ALL_CHANGE_STATUS,
         NOTIFICATIONS_SHOW_ALL_HISTORY
       } from '../constants/index';
import { ws } from '../index';

function* fetchNotifications () {
  const { response, error } = yield call(getNotifications);

  if (response) {
    yield put(fetchNotificationsSuccess(response));
  } else {
    yield put(fetchNotificationsFailed(error.message));
  }
}

export function* fetchAddNotifications (action) {
  const { response, error } = yield call(addNotifications, action.message);

  if (response) {
    yield put(addNotificationsSuccess(response));
  } else {
    yield put(fetchNotificationsFailed(error.message));
  }
}

export function* sendNotificationWS (action) {
  yield ws.send(action.message);
}

export function* changeNotificationStatus (action) {
  const { response, error } =
    yield call(changeStatus, action.id, action.viewed);

  if (response) {
    yield put(changeStatusNotificationSuccess(response));
  } else {
    yield put(fetchNotificationsFailed(error.message));
  }
}
export function* changeAllNotificationStatus (action) {
  const { response, error } =
    yield call(changeAllStatus);

  if (response) {
    yield put(fetchNotificationsSuccess(response));
  } else {
    yield put(fetchNotificationsFailed(error.message));
  }
}

export function* showAllNotificationHistory (action) {
  const { response, error } =
    yield call(showAllHistory);

  if (response) {
    yield put(fetchNotificationsSuccess(response));
  } else {
    yield put(fetchNotificationsFailed(error.message));
  }
}

export function* watchLoadNotifications () {
  yield takeEvery(NOTIFICATIONS_FETCH_REQUESTED, fetchNotifications);
}

export function* watchAddNotification () {
  yield takeEvery(ADD_NOTIFICATIONS,
    fetchAddNotifications);
}

export function* watchSendNotificationWS () {
  yield takeEvery(SEND_NOTIFICATION_WS, sendNotificationWS);
}

export function* watchNotificationChangeStatus () {
  yield takeEvery(NOTIFICATIONS_CHANGE_STATUS, changeNotificationStatus);
}

export function* watchNotificationAllStatusChange () {
  yield takeEvery(NOTIFICATIONS_ALL_CHANGE_STATUS, changeAllNotificationStatus);
}

export function* watchNotificationShowAllHistory () {
  yield takeEvery(NOTIFICATIONS_SHOW_ALL_HISTORY, showAllNotificationHistory);
}
