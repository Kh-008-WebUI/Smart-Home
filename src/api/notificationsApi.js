import jsonNotifications from '../data/notifications.json';

export const getNotifications = () => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(jsonNotifications);
  //   }, 1000);
  // });
  return fetch('http://localhost:3001/api/notifications').
    then((response) => {
      return response.json();
    });
};


