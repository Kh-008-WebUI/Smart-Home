import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';

export const usersList = () => {
  return Transport.get(`${SERVER_API}/users`);
};

export const updateProfileRequest = (data) => {
  return Transport.put(`${SERVER_API}/users/${data.id}`,
    JSON.stringify(data));
};
