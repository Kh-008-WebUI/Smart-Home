import { DELETE_DEVICE, DELETE_DEVICE_ASYNC } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';
import { put, call } from 'redux-saga/effects';

export const deleteDeviceSuccess = (id) => ({
  type: DELETE_DEVICE,
  id
});

export const deleteDeviceAsync = (id) => ({
  type: DELETE_DEVICE_ASYNC,
  id
});

export function* deleteDevice (action) {
  const id = yield call(DeviceListApi.deleteDevice, action.id);

  yield put(deleteDeviceSuccess(id));
}
