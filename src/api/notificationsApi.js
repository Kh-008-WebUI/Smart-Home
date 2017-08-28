import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';

export const getNotifications = (pageNumber = 0, itemsPerPage = 0) => {
  return Transport.get(
    `${SERVER_API}/notifications
?itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`);
};

export const changeStatus = (id, status) => {
  return Transport.put(`${SERVER_API}/notifications/${id}`,
   JSON.stringify({ viewed: status }));
};

export const changeAllStatus = () => {
  return Transport.put(`${SERVER_API}/notifications/viewed`);
};

export const showAllHistory = () => {
  return Transport.get(`${SERVER_API}/notifications/history`);
};

export const addNotifications = (message) => {
  return Transport.post(`${SERVER_API}/notifications`,
    JSON.stringify({ text: message }));
};

export const getTodaysUnreadNotificationsCount = () => {
  return Transport.get(
    `${SERVER_API}/notifications/today/unreadCount`);
};
