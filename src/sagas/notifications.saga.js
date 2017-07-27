import { call, put, takeEvery } from 'redux-saga/effects';
import { getNotifications,
   changeStatusNotifications,
 addNotifications } from '../api/notificationsApi';
import { fetchNotificationsSuccess, fetchNotificationsFailed }
  from '../actions/notifications.action';
import { NOTIFICATIONS_FETCH_REQUESTED,
  NOTIFICATIONS_CHANGE_STATUS } from '../constants/index';

function* fetchNotifications () {
  try {
    const notifications = yield call(getNotifications);

    yield put(fetchNotificationsSuccess(notifications));
  } catch (e) {
    yield put(fetchNotificationsFailed(e));
  }
}

export function* watchLoadNotifications () {
  yield takeEvery(NOTIFICATIONS_FETCH_REQUESTED, fetchNotifications);
}

export function* watchStatusNotifications (action) {
  yield takeEvery(NOTIFICATIONS_CHANGE_STATUS,
    changeStatusNotifications, action.id);
}

export function* watchAddNotifications (action) {
  yield takeEvery('NOTIFICATION_ADD',
    addNotifications, action.message);
}
