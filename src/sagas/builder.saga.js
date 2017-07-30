import { ADD_DEVICE, EDIT_DEVICE } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';
import {
  addDeviceSuccess,
  addDeviceFailure,
  clearAddStatus,
  editDeviceSuccess
} from '../actions/builder.action';
import { loadDevices } from '../actions/devices.action';
import { delay } from 'redux-saga';
import { all, takeEvery, put, call } from 'redux-saga/effects';

export function* addDevice (action) {
  try {
    const device = yield call(DeviceListApi.addDevice, action.device);

    yield put(addDeviceSuccess());
    yield put(loadDevices());
  } catch (e) {
    yield put(addDeviceFailure(e));
    yield delay(2000);
    yield put(clearAddStatus());
  }
}

export function* editDevice (action) {
  try {
    const device = yield call(DeviceListApi.getDevice, action.id);

    yield put(editDeviceSuccess(device));
  } catch (error) {
    yield put(addDeviceFailure(error));
  }
}

export function* watchAddDevice () {
  yield takeEvery(ADD_DEVICE, addDevice);
}

export function* watchEditDevice () {
  yield takeEvery(EDIT_DEVICE, editDevice);
}

