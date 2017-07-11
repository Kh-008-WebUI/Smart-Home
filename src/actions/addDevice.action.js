import { ADD_DEVICE } from '../constants/constants';
import DeviceListApi from '../api/deviceListApi';

export const addDevice = (device) => {
  return {
    type: ADD_DEVICE,
    device
  };
};
