import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';

export const login = (data) => {
  return Transport.post(
    `${SERVER_API}/login`,
    JSON.stringify(data)
  );
};

export const getRegisterData = (data) => {
  return Transport.post(
    `${SERVER_API}/register`,
    JSON.stringify(data)
  );
};

export const getUserData = () => {
  return Transport.get(
    `${SERVER_API}/login`
  );
};

export const logout = () => {
  return Transport.get(
    `${SERVER_API}/logout`
  );
};
