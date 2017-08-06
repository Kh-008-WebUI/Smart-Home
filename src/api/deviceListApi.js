import devices from '../data/data.json';
import Transport from '../transport/transport';

export default class DeviceListApi {
  static getDevices () {
    return Transport.get('http://localhost:3001/api/devices');
  }
  static addDevice (device) {
    return Transport.post(
      'http://localhost:3001/api/devices',
      JSON.stringify(device));
  }
  static getDevice (id) {
    return Transport.get('http://localhost:3001/api/devices/device/' + id);
  }
  static deleteDevice (id) {
    return Transport.delete('http://localhost:3001/api/devices/' + id);
  }
  static updateDevice (id, data) {
    return Transport.put('http://localhost:3001/api/devices/' + id,
    JSON.stringify(data));
  }
  static updateDeviceSettings (value, settingId, deviceId) {
    return Transport.put(
      `http://localhost:3001/api/devices/items/${deviceId}/${settingId}`,
    JSON.stringify({ value }));
  }
}
