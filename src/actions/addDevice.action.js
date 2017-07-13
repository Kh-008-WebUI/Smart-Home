import { ADD_DEVICE } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';

export const addDevice = (device) => {
  return {
    type: ADD_DEVICE,
    device
  };
};
