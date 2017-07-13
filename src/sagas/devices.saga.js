import { all, takeEvery, put, call } from 'redux-saga/effects';
import DeviceListApi from '../api/deviceListApi';
import {
  loadDevicesSuccess,
  loadDevicesFail,
  deleteDeviceSuccess,
  LOAD_DEVICES,
  LOAD_DEVICES_SUCCESS,
  LOAD_DEVICE_ASYNC,
  LOAD_DEVICES_FAILURE,
  DELETE_DEVICE,
  DELETE_DEVICE_ASYNC,
  CHANGE_STATUS,
  SEARCH_ITEM,
  CHANGE_FILTER_OPTION } from '../actions/devices.action';

export function* loadDevicesSaga () {
  try {
    const devices = yield call(DeviceListApi.getDevices);

    yield put(loadDevicesSuccess(devices));
  } catch (e) {
    yield put(loadDevicesFail());
  }
}

export function* loadDevice (action) {
  const device = yield call(DeviceListApi.getDevice, action.id);

  yield put(loadDevicesSuccess([device]));
}

export function* deleteDevice (action) {
  const id = yield call(DeviceListApi.deleteDevice, action.id);

  yield put(deleteDeviceSuccess(id));
}

export function* watchLoadDevices () {
  yield takeEvery('LOAD_DEVICES', loadDevicesSaga);
}

export function* watchLoadDeviceAsync () {
  yield takeEvery('LOAD_DEVICE_ASYNC', loadDevice);
}

export function* watchDeleteDeviceAsync () {
  yield takeEvery('DELETE_DEVICE_ASYNC', deleteDevice);
}
