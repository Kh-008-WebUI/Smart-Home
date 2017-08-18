import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';

export const getNotifications = () => {
  return Transport.get(`${SERVER_API}/notifications`);
};

export const changeStatus = (id, status) => {
  return Transport.put(`${SERVER_API}/notifications/${id}`,
   JSON.stringify({ viewed: status }));
};

export const changeAllStatus = (statusForAll) => {
  return Transport.put(`${SERVER_API}/notifications/`,
   JSON.stringify({
     status: statusForAll
   }));
};

export const addNotifications = (message) => {
  return Transport.post(`${SERVER_API}/notifications`,
    JSON.stringify({ text: message }));
};
