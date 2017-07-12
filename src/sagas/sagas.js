import { all, takeEvery } from 'redux-saga/effects';
import {
  loadDevices,
  loadDevice } from '../actions/loadDevices.action';
import { deleteDevice } from '../actions/deleteDevice.action';
import { watchAddDevice } from './addDevice.sagas';

export function* watchLoadDevicesAsync () {
  yield takeEvery('LOAD_DEVICES_ASYNC', loadDevices);
}

export function* watchLoadDeviceAsync () {
  yield takeEvery('LOAD_DEVICE_ASYNC', loadDevice);
}

export function* watchDeleteDeviceAsync () {
  yield takeEvery('DELETE_DEVICE_ASYNC', deleteDevice);
}

export default function* rootSaga () {
  yield all([
    watchLoadDeviceAsync(),
    watchLoadDevicesAsync(),
    watchDeleteDeviceAsync(),
    watchAddDevice()
  ]);
}
