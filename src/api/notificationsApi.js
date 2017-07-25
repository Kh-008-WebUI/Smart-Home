import jsonNotifications from '../data/notifications.json';

export const getNotifications = () => {
  return fetch('http://localhost:3001/api/notifications').
    then((response) => {
      return response.json();
    });
};


