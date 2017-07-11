import { all, takeEvery } from 'redux-saga/effects';
import {
  loadDevices,
  loadDevice,
  addDevice } from '../actions/loadDevices.action';
import { deleteDevice } from '../actions/deleteDevice.action';
import currentUsersSaga from './currentUsersSaga';
import notificationsSaga from './notificationsSaga';

export function *watchLoadDevicesAsync () {
  yield takeEvery('LOAD_DEVICES_ASYNC', loadDevices);
}

export function *watchLoadDeviceAsync () {
  yield takeEvery('LOAD_DEVICE_ASYNC', loadDevice);
}

export function *watchDeleteDeviceAsync () {
  yield takeEvery('DELETE_DEVICE_ASYNC', deleteDevice);
}

export function *watchAddDeviceAsync () {
  yield takeEvery('ADD_DEVICE', addDevice);
}

export default function *rootSaga () {
  yield all([
    watchLoadDeviceAsync(),
    watchLoadDevicesAsync(),
    watchDeleteDeviceAsync(),
    watchAddDeviceAsync(),
    currentUsersSaga(),
    notificationsSaga()
  ]);
}
