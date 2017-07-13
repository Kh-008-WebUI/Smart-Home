import jsonNotifications from '../data/notifications.json';

export const getNotifications = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(jsonNotifications);
    }, 1000);
  });
};


