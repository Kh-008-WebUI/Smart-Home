import { all, takeEvery } from 'redux-saga/effects';
import { watchLoadUsers } from './users.saga';
import { watchLoadNotifications } from './notifications.saga';
import { watchAddDevice } from './builder.saga';
import { watchLogin, watchRegistration } from './auth.saga';
import {
  watchLoadDevices,
  watchLoadDevice,
  watchLoadDeviceAsync,
  watchDeleteDeviceAsync } from './devices.saga.js';

export default function* rootSaga () {
  yield all([
    watchLoadDevice(),
    watchLoadDevices(),
    watchDeleteDeviceAsync(),
    watchLoadUsers(),
    watchLoadNotifications(),
    watchAddDevice(),
    watchLogin(),
    watchRegistration()
  ]);
}
