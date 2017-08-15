import { ADD_DEVICE,
  EDIT_DEVICE,
  LOAD_LOCATIONS,
  ADD_LOCATION,
  DELETE_LOCATION,
  DEVICES_IN_LOCATION } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';
import {
  addDeviceSuccess,
  addDeviceFailure,
  clearAddStatus,
  editDeviceSuccess,
  loadLocationsSuccess,
  addLocationSuccess,
  deleteLocationSuccess,
  setValue,
  devicesInLocationSuccess
} from '../actions/builder.action';
import { loadDevices } from '../actions/devices.action';
import { delay } from 'redux-saga';
import { all, takeEvery, put, call } from 'redux-saga/effects';

export function* addDevice (action) {
  const { response, error } =
    yield call(DeviceListApi.addDevice, action.device);

  if (response) {
    yield put(addDeviceSuccess(response));
    yield put(loadDevices());
  } else {
    yield put(addDeviceFailure(error.message));
  }
}

export function* editDevice (action) {
  const { response, error } = yield call(DeviceListApi.getDevice, action.id);

  if (response) {
    yield put(editDeviceSuccess(response));
  } else {
    yield put(addDeviceFailure(error.message));
  }
}

export function* loadLocations (action) {
  const { response, error } = yield call(DeviceListApi.loadLocations);

  if (response) {
    yield put(loadLocationsSuccess(response));
    yield put(setValue('location', response[0].label));
  } else {
    yield put(addDeviceFailure(error.message));
  }
}

export function* addLocation (action) {
  const { response, error } = yield call(DeviceListApi.addLocation,
    action.location);

  if (response) {
    yield put(addLocationSuccess(response));
  } else {
    yield put(addDeviceFailure(error.message));
  }
}
export function* deleteLocation (action) {
  const { response, error } = yield call(DeviceListApi.deleteLocation,
    action.id);

  if (response) {
    yield put(deleteLocationSuccess(response));
  } else {
    yield put(addDeviceFailure(error.message));
  }
}

export function* devicesInLocation (action) {
  const { response, error } = yield call(DeviceListApi.devicesInLocation,
    action.id);

  if (response) {
    yield put(devicesInLocationSuccess(response));
  } else {
    yield put(addDeviceFailure(error.message));
  }
}
export function* watchAddDevice () {
  yield takeEvery(ADD_DEVICE, addDevice);
}

export function* watchEditDevice () {
  yield takeEvery(EDIT_DEVICE, editDevice);
}

export function* watchLoadLocations () {
  yield takeEvery(LOAD_LOCATIONS, loadLocations);
}

export function* watchAddLocation () {
  yield takeEvery(ADD_LOCATION, addLocation);
}

export function* watchDeleteLocation () {
  yield takeEvery(DELETE_LOCATION, deleteLocation);
}

export function* watchDevicesInLocation () {
  yield takeEvery(DEVICES_IN_LOCATION, devicesInLocation);
}
