import { ADD_DEVICE } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';
import {
  addDeviceSuccess,
  addDeviceFailure,
  clearAddStatus
} from '../actions/builder.action';
import { addDeviceToList, loadDevices } from '../actions/devices.action';
import { delay } from 'redux-saga';
import { all, takeEvery, put, call } from 'redux-saga/effects';

export function* addDevice (action) {
  try {
    const device = yield call(DeviceListApi.addDevice, action.device);

    yield put(addDeviceSuccess());
    yield put(loadDevices());
    yield put(addDeviceToList(device));
  } catch (e) {
    yield put(addDeviceFailure(e));
    yield delay(2000);
    yield put(clearAddStatus());
  }
}

export function* watchAddDevice () {
  yield takeEvery(ADD_DEVICE, addDevice);
}
