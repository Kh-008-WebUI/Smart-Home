import { all, takeEvery } from 'redux-saga/effects';
import currentUsersSaga from './users.saga';
import notificationsSaga from './notifications.saga';
import { watchAddDevice } from './builder.saga';
import {
  watchLoadDevices,
  watchLoadDeviceAsync,
  watchDeleteDeviceAsync } from './devices.saga.js';

export default function* rootSaga () {
  yield all([
    watchLoadDeviceAsync(),
    watchLoadDevices(),
    watchDeleteDeviceAsync(),
    currentUsersSaga(),
    notificationsSaga(),
    watchAddDevice()
  ]);
}
