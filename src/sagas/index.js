import { all, takeEvery } from 'redux-saga/effects';
import currentUsersSaga from './users.saga';
import notificationsSaga from './notifications.saga';
import { watchAddDevice } from './builder.saga';
import { watchLogin, watchRegistration } from './auth.saga';
import {
  watchLoadDevices,
  watchLoadDevice,
  watchLoadDeviceAsync,
  watchDeleteDeviceAsync,
  watchUpdateDeviceAsync } from './devices.saga.js';

export default function* rootSaga () {
  yield all([
    watchLoadDevice(),
    watchLoadDevices(),
    watchDeleteDeviceAsync(),
    watchUpdateDeviceAsync(),
    currentUsersSaga(),
    notificationsSaga(),
    watchAddDevice(),
    watchLogin(),
    watchRegistration()
  ]);
}
