import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchAddNotifications
} from '../actions/notifications.action';

export function searchItem (item, searchValue) {
  const result = item.name.toLowerCase()
    .includes(searchValue.toLowerCase().trim());

  return result;
}

export const queryFromObject = (params) => {
  const queries = [];

  for (const key of Object.keys(params)) {
    if (params[key]) {
      queries.push(`${key}=${params[key]}`);
    }
  }
  return `?${queries.join('&')}`;
};

const sortDevicesByAlphabet = (devices) => {
  return devices.sort((first, second) => {
    if (first.location < second.location) {
      return -1;
    }
    if (first.location > second.location) {
      return 1;
    }

    return 0;
  });
};

export const sortDevicesByLocations = (devices) => {
  return sortDevicesByAlphabet(devices).reduce((location, device) => {
    if (!location[device.location]) {
      location[device.location] = [];
    }
    location[device.location].push(device);

    return location;
  }, {});
};

export const setItemDefaultData = (item) => {
  switch (item.name) {
    case 'Toggle':
      item.data = false;
      break;
    case 'Value':
      item.data = '';
      break;
    case 'Range':
      item.data = 0;
      break;
    case 'Timer':
      item.data = '00:00';
      break;
    default:
      break;
  }
};

export const findByProperty = (collection, property, propertyValue) => {
  const obj = collection.filter((item) => {
    return item[property] === propertyValue;
  })[0];

  return obj;
};

export const sortEmergencyNotifications =
  (listEmergency, listNotifications) => {
    listNotifications.forEach((item, index) => {
      if (item.emergency && (item.viewed === false)) {
        listNotifications.splice(index, 1);
      }
    });
    listEmergency.forEach((item) => {
      listNotifications.unshift(item);
    });
  };

export const webSocket = (msg, notif, updChart) => {
  const message = JSON.parse(msg.data);

  switch (message.type) {
    case 'chart':
      updChart(message.data);
      break;
    case 'notification':
      notif();
      break;
    default:
      break;
  }
};
