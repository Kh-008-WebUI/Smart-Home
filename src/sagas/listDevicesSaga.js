import { LOAD_DEVICES_ASYNC } from '../actions/devices.action.js';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getDevices } from '../api/deviceListApi.js';
import { loadDevicesSuccess } from '../actions/devices.action.js';

function *getDevicesList () {
  const devices = yield call(getDevices);

  console.log(devices);
  yield put(loadDevicesSuccess(devices));
}
export default function *devicesSaga () {
  yield takeEvery('UPDATE_CURRENT_REQUEST', getDevicesList);
}

