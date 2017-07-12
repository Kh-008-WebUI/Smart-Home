import { ADD_DEVICE,
  CLEAR_DEVICE_STATUS } from '../constants/constants';
import DeviceListApi from '../api/deviceListApi';

export const addDevice = (device) => {
  return {
    type: ADD_DEVICE,
    device
  };
};

export const clearDeviceStatus = () => ({
  type: CLEAR_DEVICE_STATUS
});

