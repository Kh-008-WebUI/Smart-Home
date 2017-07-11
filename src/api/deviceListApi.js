import devices from '../data/data.json';

let listDevices = [...devices];

export default class DeviceListApi {
  static getDevices () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([...listDevices]);
      }, 2000);
    });
  }
  static addDevice (device) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        device.id = listDevices.length + 1;
        device.status = true;
        listDevices = [...listDevices, device];
        resolve(device);
      }, 2000);
    });
  }
  static getDevice (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let device;

        devices.map((item) => {
          if (item.id === id) {
            device = Object.assign({}, item);
          }
        });
        resolve(device);
      }, 2000);
    });
  }
  static deleteDevice (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(id);
      }, 300);
    });
  }
}
