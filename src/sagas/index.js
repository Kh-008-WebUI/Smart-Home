import { all, takeEvery } from 'redux-saga/effects';
import {
  loadDevicesSaga,
  loadDevices,
  loadDevice
} from '../actions/loadDevices.action';
import { deleteDevice } from '../actions/deleteDevice.action';
import currentUsersSaga from './users.saga';
import notificationsSaga from './notifications.saga';
import { watchAddDevice } from './addDevice.sagas';

export function* watchLoadDevices () {
  yield takeEvery('LOAD_DEVICES', loadDevicesSaga);
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
    watchLoadDevices(),
    watchDeleteDeviceAsync(),
    currentUsersSaga(),
    notificationsSaga(),
    watchAddDevice()
  ]);
}
