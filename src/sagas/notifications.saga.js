import { call, put, takeEvery } from 'redux-saga/effects';
import { getNotifications } from '../api/notificationsApi';
import { fetchNotificationsSuccess, fetchNotificationsFailed }
from '../actions/notifications.action';
import { NOTIFICATIONS_FETCH_REQUESTED } from '../constants/index';

function* fetchNotifications () {
  try {
    const notifications = yield call(getNotifications);

    yield put(fetchNotificationsSuccess(notifications));
  } catch (e) {
    yield put(fetchNotificationsFailed(e));
  }
}

export default function* notificationsSaga () {
  yield takeEvery(NOTIFICATIONS_FETCH_REQUESTED, fetchNotifications);
}
