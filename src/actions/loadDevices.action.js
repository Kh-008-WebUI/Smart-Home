import { LOAD_DEVICES, LOAD_DEVICES_ASYNC,
        LOAD_DEVICE_ASYNC, ADD_DEVICE_ASYNC } from '../constants/constants';
import DeviceListApi from '../api/deviceListApi';
import { put, call } from 'redux-saga/effects';

export const loadDevicesSuccess = (devices) => {
  return {
    type: LOAD_DEVICES,
    devices
  };
};

export const addDeviceAsync = (device) => {
  return {
    type: ADD_DEVICE_ASYNC,
    device
  };
};

export const loadDevicesAsync = () => {
  return {
    type: LOAD_DEVICES_ASYNC
  };
};

export const loadDeviceAsync = (id) => {
  return {
    type: LOAD_DEVICE_ASYNC,
    id
  };
};

export function *addDevice (action) {
  const device = yield call(DeviceListApi.addDevice, action.device);

  yield put(addDeviceAsync(device));
}

export function *loadDevices () {
  const devices = yield call(DeviceListApi.getDevices);

  yield put(loadDevicesSuccess(devices));
}

export function* loadDevice (action) {
  const device = yield call(DeviceListApi.getDevice, action.id);

  yield put(loadDevicesSuccess([device]));
}
