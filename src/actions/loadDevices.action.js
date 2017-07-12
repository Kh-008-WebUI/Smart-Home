import { LOAD_DEVICES,
  LOAD_DEVICES_SUCCESS,
  LOAD_DEVICE_ASYNC,
  LOAD_DEVICES_FAILURE, ADD_DEVICE_ASYNC } from '../constants/constants';
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

export const loadDeviceAsync = (id) => {
  return {
    type: LOAD_DEVICE_ASYNC,
    id
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

export function* loadDevice (action) {
  const device = yield call(DeviceListApi.getDevice, action.id);

  yield put(loadDevicesSuccess([device]));
}
