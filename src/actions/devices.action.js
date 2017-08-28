import {
  LOAD_DEVICES,
  LOAD_DEVICES_SUCCESS,
  LOAD_DEVICE_SUCCESS,
  LOAD_DEVICE,
  LOAD_DEVICES_FAIL,
  LOAD_DEVICE_FAIL,
  DELETE_DEVICE_SUCCESS,
  DELETE_DEVICE,
  DELETE_DEVICE_FAIL,
  LOAD_DEVICE_ASYNC,
  CHANGE_STATUS,
  SEARCH_ITEM,
  CHANGE_FILTER_OPTION,
  LIST_SET_ITEM_VALUE,
  ADD_DEVICE_TO_LIST,
  UPDATE_DEVICE,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_SETTINGS,
  UPDATE_DEVICE_FAILURE,
  UPDATE_DEVICE_SETTINGS_SUCCESS,
  CLEAR_STATUS,
  RESET_DEVICE,
  LOAD_DEVICE_PENDING
 } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';
import { put, call } from 'redux-saga/effects';

export const loadDevices = (devices) => {
  return {
    type: LOAD_DEVICES,
    devices
  };
};

export const loadDevicesSuccess = (devices) => {
  return {
    type: LOAD_DEVICES_SUCCESS,
    devices
  };
};

export const loadDevicesFail = (errorText) => {
  return {
    type: LOAD_DEVICES_FAIL,
    errorText
  };
};

export const loadDevice = (id) => {
  return {
    type: LOAD_DEVICE,
    id
  };
};

export const loadDevicePending = () => {
  return {
    type: LOAD_DEVICE_PENDING
  };
};

export const loadDeviceAsync = (id) => {
  return {
    type: LOAD_DEVICE_ASYNC,
    id
  };
};
export const loadDeviceSuccess = (device) => {
  return {
    type: LOAD_DEVICE_SUCCESS,
    device
  };
};
export const loadDeviceFail = (errorText, errorName) => {
  return {
    type: LOAD_DEVICE_FAIL,
    errorName,
    errorText
  };
};
export const deleteDeviceSuccess = (id) => ({
  type: DELETE_DEVICE_SUCCESS,
  id
});

export const deleteDevice = (id) => ({
  type: DELETE_DEVICE,
  id
});

export const deleteDeviceFail = (errorText) => ({
  type: DELETE_DEVICE_FAIL,
  errorText
});

export const updateDevice = (data, id) => {
  return {
    type: UPDATE_DEVICE,
    data,
    id
  };
};

export const updateDeviceSuccess = (device, id) => {
  return {
    type: UPDATE_DEVICE_SUCCESS,
    device,
    id
  };
};

export const updateDeviceFail = (errorText) => {
  return {
    type: UPDATE_DEVICE_FAILURE,
    errorText
  };
};

export const updateDeviceSettingsSuccess = (device) => {
  return {
    type: UPDATE_DEVICE_SETTINGS_SUCCESS,
    device
  };
};

export const updateDeviceSettings = (value, settingId, deviceId) => {
  return {
    type: UPDATE_DEVICE_SETTINGS,
    value,
    settingId,
    deviceId
  };
};

export const resetDevice = () => {
  return {
    type: RESET_DEVICE
  };
};

export const clearStatus = () => {
  return {
    type: CLEAR_STATUS
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
