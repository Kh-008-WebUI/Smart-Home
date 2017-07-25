import Transport from '../transport/transport';

export const getNotifications = () => {
  return Transport.get('http://localhost:3001/api/notifications');
};


