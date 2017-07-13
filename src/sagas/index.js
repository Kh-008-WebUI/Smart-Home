import { all, takeEvery } from 'redux-saga/effects';
import {
  loadDevicesSaga,
  loadDevices,
  loadDeviceSaga,
  deleteDevice
} from '../actions/devices.action';
import currentUsersSaga from './users.saga';
import notificationsSaga from './notifications.saga';
import { watchAddDevice } from './builder.saga';

export function* watchLoadDevices () {
  yield takeEvery('LOAD_DEVICES', loadDevicesSaga);
}

export function* watchLoadDevice () {
  yield takeEvery('LOAD_DEVICE', loadDeviceSaga);
}

export function* watchDeleteDeviceAsync () {
  yield takeEvery('DELETE_DEVICE_ASYNC', deleteDevice);
}

export default function* rootSaga () {
  yield all([
    watchLoadDevice(),
    watchLoadDevices(),
    watchDeleteDeviceAsync(),
    currentUsersSaga(),
    notificationsSaga(),
    watchAddDevice()
  ]);
}
