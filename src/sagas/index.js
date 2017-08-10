import { all, takeEvery } from 'redux-saga/effects';
import { watchLoadUsers, watchUpdateUserProfile } from './users.saga';
import { watchLoadNotifications,
  watchAddNotification,
  watchSendNotificationWS,
  watchNotificationChangeStatus } from './notifications.saga';
import { watchAddDevice, watchEditDevice } from './builder.saga';
import { watchLogin,
  watchRegistration,
  watchLoadUser,
  watchLogout } from './auth.saga';
import {
  watchLoadDevices,
  watchLoadDevice,
  watchLoadDeviceAsync,
  watchDeleteDeviceAsync,
  watchUpdateDeviceAsync,
  watchUpdateDeviceSettings } from './devices.saga.js';

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
    watchEditDevice(),
    watchNotificationChangeStatus(),
    watchUpdateDeviceSettings(),
    watchLoadUser(),
    watchLogout()
  ]);
}

