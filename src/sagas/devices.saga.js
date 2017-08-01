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
  updateDeviceSettingsSuccess
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
  LIST_SET_ITEM_VALUE } from '../constants/index';

export function* loadDevicesSaga () {
  try {
    yield put({ type:LOAD_DEVICES_PENDING });
    const devices = yield call(DeviceListApi.getDevices);

    yield put(loadDevicesSuccess(devices));
  } catch (e) {
    yield put(loadDevicesFail());
  }
}

export function* loadDeviceSaga (action) {
  try {
    yield put({ type:LOAD_DEVICE_PENDING });
    const device = yield call(DeviceListApi.getDevice, action.id);

    yield put(loadDeviceSuccess(device));
  } catch (error) {
    yield put(loadDeviceFail(error));
  }
}

export function* deleteDevice (action) {
  try {
    const id = yield call(DeviceListApi.deleteDevice, action.id);

    yield put(deleteDeviceSuccess(id));
  } catch (e) {
    yield put(deleteDeviceFail(e));
  }
}

export function* updateDevice (action) {
  try {
    const device = yield call(DeviceListApi.updateDevice,
      action.id, action.data);

    yield put(updateDeviceSuccess(device, action.id));
  } catch (e) {
    console.log(e);
  }
}

export function* updateDeviceSettings (action) {
  try {
    const device = yield call(DeviceListApi.updateDeviceSettings,
      action.deviceId, action.settingId, action.value);

    yield put(updateDeviceSettingsSuccess(device));
  } catch (e) {
    console.log(e);
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
  yield takeEvery(LIST_SET_ITEM_VALUE, updateDeviceSettings);
}
