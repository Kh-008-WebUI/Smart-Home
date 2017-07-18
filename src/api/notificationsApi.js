import jsonNotifications from '../data/notifications.json';

export const getNotifications = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(jsonNotifications);
    }, 1000);
  });
};


