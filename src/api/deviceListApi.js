import devices from '../data/data.json';

let listDevices = [...devices];

export default class DeviceListApi {
  static getDevices () {
    return fetch('http://localhost:3001/devices')
    .then(response => {
      return response.json();
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
    return fetch('http://localhost:3001/devices/device/' + id)
    .then(response => {
      return response.json();
    });
  }
  static deleteDevice (id) {
    return fetch('http://localhost:3001/devices/delete/' + id)
      .then(response => {
        return response.text();
      });
  }
  static updateDevice (id, data) {
    return fetch('http://localhost:3001/devices/update/' + id,
      {
        method:'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => {
        return response.json();
      });
  }
}
