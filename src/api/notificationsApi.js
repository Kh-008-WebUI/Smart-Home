import jsonNotifications from '../data/notifications.json';

export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(jsonNotifications);
    }, 1000);
  });
};
