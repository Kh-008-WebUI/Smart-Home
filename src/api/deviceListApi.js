import devices from '../data/data.json';
import Transport from '../transport/transport';

export default class DeviceListApi {
  static getDevices () {
    return Transport.get('http://localhost:3001/api/devices');
  }
  static addDevice (device) {
    device.status = true;

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
}
