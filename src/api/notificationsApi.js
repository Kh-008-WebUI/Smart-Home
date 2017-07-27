import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';

export const getNotifications = () => {
  return Transport.get(`${SERVER_API}/notifications`);
};

export const changeStatusNotifications = (id) => {
  return Transport.put(`${SERVER_API}/notifications/${id}`);
};

export const addNotifications = (message, id) => {
  return Transport.post(`${SERVER_API}/notifications/${id}`,
    JSON.stringify(message));
};
