import { all, takeEvery } from 'redux-saga/effects';
import { watchLoadUsers, watchUpdateUserProfile } from './users.saga';
import { watchLoadNotifications,
  watchAddNotification,
  watchSendNotificationWS,
  watchNotificationChangeStatus } from './notifications.saga';
import { watchAddDevice,
  watchEditDevice,
  watchLoadLocations,
  watchAddLocation,
  watchDeleteLocation,
  watchDevicesInLocation } from './builder.saga';
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
import { watchWS } from './ws.saga';

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
    watchLogout(),
    watchLoadLocations(),
    watchAddLocation(),
    watchDeleteLocation(),
    watchDevicesInLocation(),
    watchWS()
  ]);
}
