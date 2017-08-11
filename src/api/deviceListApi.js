import devices from '../data/data.json';
import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';

export default class DeviceListApi {
  static getDevices () {
    return Transport.get(`${SERVER_API}/devices`);
  }
  static addDevice (device) {
    return Transport.post(
      `${SERVER_API}/devices`,
      JSON.stringify(device));
  }
  static getDevice (id) {
    return Transport.get(`${SERVER_API}/devices/device/${id}`);
  }
  static deleteDevice (id) {
    return Transport.delete(`${SERVER_API}/devices/${id}`);
  }
  static updateDevice (id, data) {
    return Transport.put(`${SERVER_API}/devices/${id}`,
    JSON.stringify(data));
  }
  static updateDeviceSettings (value, settingId, deviceId) {
    return Transport.put(
      `${SERVER_API}/devices/items/${deviceId}/${settingId}`,
    JSON.stringify({ value }));
  }
  static loadLocations () {
    return Transport.get(`${SERVER_API}/location`);
  }
}
