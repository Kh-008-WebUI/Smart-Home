import {
  LOAD_DEVICES,
  LOAD_DEVICES_SUCCESS,
  LOAD_DEVICE_SUCCESS,
  LOAD_DEVICE,
  LOAD_DEVICES_FAIL,
  LOAD_DEVICE_FAIL,
  DELETE_DEVICE,
  DELETE_DEVICE_ASYNC,
  DELETE_DEVICE_FAIL,
  LOAD_DEVICE_ASYNC,
  CHANGE_STATUS,
  SEARCH_ITEM,
  CHANGE_FILTER_OPTION,
  LIST_SET_ITEM_VALUE,
  ADD_DEVICE_TO_LIST } from '../constants/index';
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

export const loadDevicesFail = (error) => {
  return {
    type: LOAD_DEVICES_FAIL,
    error
  };
};

export const loadDevice = (id) => {
  return {
    type: LOAD_DEVICE,
    id
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
export const loadDeviceFail = (device) => {
  return {
    type: LOAD_DEVICE_FAIL,
    device
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

export const deleteDeviceFail = (error) => ({
  type: DELETE_DEVICE_FAIL,
  error
});

export const addDeviceToList = (device) => ({
  type: ADD_DEVICE_TO_LIST,
  device
});

export const changeStatus = (status, id) => {
  return {
    type: CHANGE_STATUS,
    status,
    id
  };
};

export const updateDevice = (data, id) => {
  return {
    type:'UPDATE_DEVICE',
    data,
    id
  };
};

export const updateDeviceSuccess = (device, id) => {
  return {
    type:'UPDATE_DEVICE_SUCCESS',
    device,
    id
  };
};

export const listSetItemValue = (value, id) => {
  return {
    type: LIST_SET_ITEM_VALUE,
    value,
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
