import { all, takeEvery } from 'redux-saga/effects';
import { watchLoadUsers, watchUpdateUserProfile } from './users.saga';
import { watchLoadNotifications,
        watchAddNotification,
        watchSendNotificationWS } from './notifications.saga';
import { watchAddDevice, watchEditDevice } from './builder.saga';
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
    watchUpdateUserProfile(),
    watchLoadNotifications(),
    watchAddDevice(),
    watchLogin(),
    watchRegistration(),
    watchAddNotification(),
    watchSendNotificationWS(),
    watchEditDevice()
  ]);
}

