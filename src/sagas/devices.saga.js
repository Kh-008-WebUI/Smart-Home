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
  updateDeviceSettingsSuccess,
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
  UPDATE_DEVICE,
  UPDATE_DEVICE_SETTINGS } from '../constants/index';

export function* loadDevicesSaga () {
  const { response, error } = yield call(DeviceListApi.getDevices);

  if (response) {
    yield put(loadDevicesSuccess(response));
    yield put(clearStatus());
  } else {
    yield put(loadDeviceFail(error.message));
  }
}

export function* loadDeviceSaga (action) {
  const { response, error } = yield call(DeviceListApi.getDevice, action.id);

  if (response) {
    yield put(loadDeviceSuccess(response));
    yield put(clearStatus());
  } else {
    yield put(loadDeviceFail(error.message));
  }
}

export function* deleteDevice (action) {
  const { response, error } = yield call(DeviceListApi.deleteDevice, action.id);

  if (response) {
    yield put(deleteDeviceSuccess(response));
    yield put(clearStatus());
  } else {
    yield put(deleteDeviceFail(error.message));
  }
}

export function* updateDevice (action) {
  const { response, error } = yield call(DeviceListApi.updateDevice,
      action.id, action.data);

  if (response) {
    yield put(updateDeviceSuccess(response, action.id));
    yield put(clearStatus());
  } else {
    yield put(updateDeviceFail(error.message));
  }
}

export function* updateDeviceSettings (action) {
  const { response, error } = yield call(DeviceListApi.updateDeviceSettings,
     action.value, action.settingId, action.deviceId);

  if (response) {
    yield put(updateDeviceSettingsSuccess(response));
  } else {
    yield put(updateDeviceFail(error.message));
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

export function* watchUpdateDeviceSettings () {
  yield takeEvery(UPDATE_DEVICE_SETTINGS, updateDeviceSettings);
}
