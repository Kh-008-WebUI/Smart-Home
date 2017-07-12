import jsonNotifications from '../data/notifications.json';

export default class notificationsApi {
  static getNotifications () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(jsonNotifications);
      }, 1000);
    });
  };
};

