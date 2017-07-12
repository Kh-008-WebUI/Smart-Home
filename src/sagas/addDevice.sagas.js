import { ADD_DEVICE,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE } from '../constants/constants';
import DeviceListApi from '../api/deviceListApi';
import { all, takeEvery, put, call } from 'redux-saga/effects';

const addDeviceSuccess = (device) => ({ type: ADD_DEVICE_SUCCESS });
const addDeviceFailure = (error) => ({ type: ADD_DEVICE_FAILURE, error });

export function* addDevice (action) {
  try {
    const device = yield call(DeviceListApi.addDevice, action.device);

    yield put(addDeviceSuccess());
  } catch (e) {
    yield put(addDeviceFailure(e));
  }
}

export function* watchAddDevice () {
  yield takeEvery(ADD_DEVICE, addDevice);
}
