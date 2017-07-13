import {
  LOAD_DEVICES,
  LOAD_DEVICES_SUCCESS,
  LOAD_DEVICE_SUCCESS,
  LOAD_DEVICE,
  LOAD_DEVICES_FAILURE,
  DELETE_DEVICE,
  DELETE_DEVICE_ASYNC,
  CHANGE_STATUS,
  SEARCH_ITEM,
  CHANGE_FILTER_OPTION } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';
import { put, call } from 'redux-saga/effects';

export const loadDevices = () => {
  return {
    type: LOAD_DEVICES
  };
};

export const loadDevicesSuccess = (devices) => {
  return {
    type: LOAD_DEVICES_SUCCESS,
    devices
  };
};

export const loadDevicesFail = () => {
  return {
    type: LOAD_DEVICES_FAILURE
  };
};

export const loadDevice = (id) => {
  return {
    type: LOAD_DEVICE,
    id
  };
};
export const loadDeviceSuccess = (id) => {
  return {
    type: LOAD_DEVICE_SUCCESS,
    id
  };
};

export const deleteDeviceSuccess = (id) => ({
  type: DELETE_DEVICE,
  id
});

export const deleteDeviceAsync = (id) => ({
  type: DELETE_DEVICE_ASYNC,
  id
});

export const changeStatus = (id) => {
  return {
    type: CHANGE_STATUS,
    id
  };
};

export const searchAction = (searchValue) => {
  return {
    type: SEARCH_ITEM,
    searchValue
  };
};

export const filterAction = (filterOption) => {
  return {
    type: CHANGE_FILTER_OPTION,
    filterOption
  };
};

export function* loadDevicesSaga () {
  try {
    const devices = yield call(DeviceListApi.getDevices);

    yield put(loadDevicesSuccess(devices));
  } catch (e) {
    yield put(loadDevicesFail());
  }
}

export function* loadDeviceSaga (action) {
  try {
    const device = yield call(DeviceListApi.getDevice, action.id);

    yield put(loadDeviceSuccess(device));
  } catch (e) {
    console.log(e);
  }
}

export function* deleteDevice (action) {
  const id = yield call(DeviceListApi.deleteDevice, action.id);

  yield put(deleteDeviceSuccess(id));
}
