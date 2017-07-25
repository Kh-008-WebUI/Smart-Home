import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';

export const getNotifications = () => {
  return Transport.get(`${SERVER_API}notifications`);
};


