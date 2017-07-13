import {
  ADD_DEVICE,
  ADD_ITEM,
  DELETE_ITEM,
  SET,
  RESET_DEVICE_BUILDER_FORM,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE,
  ADD_ITEM_DESCRIPTION
} from '../constants/index';

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item
  };
};
export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    id
  };
};

export const setValue = (name, value) => {
  return {
    type: SET,
    name,
    value
  };
};

export const resetProto = () => {
  return {
    type: RESET_DEVICE_BUILDER_FORM
  };
};

export const addDevice = (device) => {
  return {
    type: ADD_DEVICE,
    device
  };
};

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
