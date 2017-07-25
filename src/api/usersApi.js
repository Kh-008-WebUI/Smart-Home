import Transport from '../transport/transport';

export const usersList = () => {
  return Transport.get('http://localhost:3001/api/users');
};
