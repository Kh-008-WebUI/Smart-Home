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
  LOAD_LOCATIONS
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

export const editDeviceSuccess = (device) => {
  return {
    type: EDIT_DEVICE_SUCCESS,
    device
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
    type: 'ADD_LOCATION',
    location
  };
};

export const addLocationSuccess = (location) => {
  return {
    type: 'ADD_LOCATION_SUCCESS',
    location
  };
};
