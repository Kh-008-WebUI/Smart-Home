import {
  ADD_DEVICE,
  ADD_ITEM,
  DELETE_ITEM,
  SET,
  RESET_DEVICE_BUILDER_FORM,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE,
  ADD_ITEM_DESCRIPTION,
  CLEAR_ADD_STATUS
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

export const clearAddStatus = () => ({
  type: CLEAR_ADD_STATUS
});
