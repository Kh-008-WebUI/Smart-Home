import { call, put, takeEvery } from 'redux-saga/effects';
import { getNotifications,
         changeStatusNotifications,
         addNotifications } from '../api/notificationsApi';
import { fetchNotificationsSuccess,
         fetchNotificationsFailed,
        addNotificationsSuccess } from '../actions/notifications.action';
import { NOTIFICATIONS_FETCH_REQUESTED,
         NOTIFICATIONS_CHANGE_STATUS,
         SEND_NOTIFICATION_WS,
         ADD_NOTIFICATIONS } from '../constants/index';
import { ws } from '../index';

function* fetchNotifications () {
  try {
    const notifications = yield call(getNotifications);

    yield put(fetchNotificationsSuccess(notifications));
  } catch (e) {
    yield put(fetchNotificationsFailed(e));
  }
}

export function* fetchAddNotifications (action) {
  try {
    const message = yield call(addNotifications, action.message);

    yield put(addNotificationsSuccess(message));
  } catch (e) {
    console.log(e);
  }
}

export function* sendNotificationWS (action) {
  yield ws.send(action.message);
}

export function* watchLoadNotifications () {
  yield takeEvery(NOTIFICATIONS_FETCH_REQUESTED, fetchNotifications);
}

export function* watchStatusNotifications (action) {
  yield takeEvery(NOTIFICATIONS_CHANGE_STATUS,
    changeStatusNotifications, action.id);
}

export function* watchAddNotification () {
  yield takeEvery(ADD_NOTIFICATIONS,
    fetchAddNotifications);
}

export function* watchSendNotificationWS () {
  yield takeEvery(SEND_NOTIFICATION_WS, sendNotificationWS);
}
