import {
  ADD_DEVICE,
  ADD_ITEM,
  DELETE_ITEM,
  SET,
  RESET_DEVICE_BUILDER_FORM,
  ADD_DEVICE_SUCCESS,
  SET_ITEM_VALUE,
  ADD_DEVICE_FAILURE,
  ADD_ITEM_DESCRIPTION,
  CLEAR_ADD_STATUS,
  EDIT_DEVICE_SUCCESS,
  EDIT_DEVICE,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION,
  DELETE_LOCATION,
  DELETE_LOCATION_SUCCESS,
  SET_PARAMS,
  DEVICES_IN_LOCATION,
  DEVICES_IN_LOCATION_SUCCESSS,
  EDIT_DEVICE_FAILURE,
  DEVICE_UPDATE_UPLOAD_STATUS_SUCCESS
} from '../constants/index';

export const addItem = (item) => ({
  type: ADD_ITEM,
  item
});
export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  id
});

export const setValue = (name, value) => ({
  type: SET,
  name,
  value
});

export const resetProto = () => ({
  type: RESET_DEVICE_BUILDER_FORM
});

export const addDevice = (device) => ({
  type: ADD_DEVICE,
  device
});

export const addDeviceSuccess = (device) => ({ type: ADD_DEVICE_SUCCESS });

export const addDeviceFailure = (error) => ({
  type: ADD_DEVICE_FAILURE,
  error
});

export const addDescription = (id, value) => ({
  type: ADD_ITEM_DESCRIPTION,
  id,
  value
});

export const setItemValue = (value, id) => {
  return {
    type: SET_ITEM_VALUE,
    value,
    id
  };
};
export const clearAddStatus = () => ({
  type: CLEAR_ADD_STATUS
});

export const editDevice = (id) => {
  return {
    type: EDIT_DEVICE,
    id
  };
};

export const deviceUpdateUploadStatus = () => {
  return {
    type: DEVICE_UPDATE_UPLOAD_STATUS_SUCCESS
  };
};

export const editDeviceSuccess = (device) => {
  return {
    type: EDIT_DEVICE_SUCCESS,
    device
  };
};

export const editDeviceFalure = (errorText) => {
  return {
    type: EDIT_DEVICE_FAILURE,
    errorText
  };
};

export const loadLocations = () => {
  return {
    type: LOAD_LOCATIONS
  };
};

export const loadLocationsSuccess = (locations) => {
  return {
    type: LOAD_LOCATIONS_SUCCESS,
    locations
  };
};

export const addLocation = (location) => {
  return {
    type: ADD_LOCATION,
    location
  };
};

export const addLocationSuccess = (location) => {
  return {
    type: ADD_LOCATION_SUCCESS,
    location
  };
};

export const setParameters = (id, params) => {
  return {
    type: SET_PARAMS,
    id,
    params
  };
};

export const deleteLocation = (id) => {
  return {
    type: DELETE_LOCATION,
    id
  };
};

export const deleteLocationSuccess = (id) => {
  return {
    type: DELETE_LOCATION_SUCCESS,
    id
  };
};

export const devicesInLocation = (id, callback) => {
  return {
    type: DEVICES_IN_LOCATION,
    id,
    callback
  };
};

export const devicesInLocationSuccess = (deviceInLocation) => {
  return {
    type: DEVICES_IN_LOCATION_SUCCESSS,
    deviceInLocation
  };
};

