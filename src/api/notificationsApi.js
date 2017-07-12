import jsonNotifications from '../data/notifications.json';

export default class NotificationsApi {
  static notifications = jsonNotifications;
  static getNotifications () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([...this.notifications]);
      }, 2000);
    });
  }
}
