import { all, takeEvery } from 'redux-saga/effects';
import { watchLoadUsers } from './users.saga';
import { watchLoadNotifications } from './notifications.saga';
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
    watchLoadUsers(),
    watchLoadNotifications(),
    watchAddDevice(),
    watchLogin(),
    watchRegistration()
  ]);
}

