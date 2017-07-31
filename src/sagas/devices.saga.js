import { all, takeEvery, put, call } from 'redux-saga/effects';
import DeviceListApi from '../api/deviceListApi';
import {
  loadDevicesSuccess,
  loadDevicesFail,
  deleteDeviceSuccess,
  loadDeviceSuccess,
  deleteDeviceFail,
  loadDeviceFail,
  updateDeviceSuccess,
  updateDeviceFail,
  clearStatus
  } from '../actions/devices.action';
import {
  LOAD_DEVICES,
  LOAD_DEVICES_SUCCESS,
  LOAD_DEVICE_ASYNC,
  LOAD_DEVICES_FAILURE,
  DELETE_DEVICE,
  DELETE_DEVICE_ASYNC,
  CHANGE_STATUS,
  SEARCH_ITEM,
  CHANGE_FILTER_OPTION,
  LOAD_DEVICES_PENDING,
  LOAD_DEVICE_PENDING,
  UPDATE_DEVICE } from '../constants/index';

export function* loadDevicesSaga () {
  try {
    yield put({ type:LOAD_DEVICES_PENDING });
    const devices = yield call(DeviceListApi.getDevices);

    if (devices.status === 'error') {
      throw new Error(devices.text);
    }

    yield put(loadDevicesSuccess(devices));
    yield put(clearStatus());
  } catch (e) {
    yield put(loadDevicesFail(e.message));
  }
}

export function* loadDeviceSaga (action) {
  try {
    yield put({ type:LOAD_DEVICE_PENDING });
    const device = yield call(DeviceListApi.getDevice, action.id);

    if (device.status === 'error') {
      throw new Error(device.text);
    }

    yield put(loadDeviceSuccess(device));
    yield put(clearStatus());
  } catch (e) {
    yield put(loadDeviceFail(e.message));
  }
}

export function* deleteDevice (action) {
  try {
    const id = yield call(DeviceListApi.deleteDevice, action.id);

    if (id.status === 'error') {
      throw new Error(id.text);
    }

    yield put(deleteDeviceSuccess(id));
    yield put(clearStatus());
  } catch (e) {
    yield put(deleteDeviceFail(e.message));
  }
}

export function* updateDevice (action) {
  try {
    const device = yield call(DeviceListApi.updateDevice,
      action.id, action.data);

    if (device.status === 'error') {
      throw new Error(device.text);
    }

    yield put(updateDeviceSuccess(device, action.id));
    yield put(clearStatus());
  } catch (e) {
    yield put(updateDeviceFail(e.message));
  }
}

export function* watchLoadDevices () {
  yield takeEvery(LOAD_DEVICES, loadDevicesSaga);
}

export function* watchLoadDevice () {
  yield takeEvery(LOAD_DEVICE_ASYNC, loadDeviceSaga);
}

export function* watchDeleteDeviceAsync () {
  yield takeEvery(DELETE_DEVICE, deleteDevice);
}

export function* watchUpdateDeviceAsync () {
  yield takeEvery(UPDATE_DEVICE, updateDevice);
}
