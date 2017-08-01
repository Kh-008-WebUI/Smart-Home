import Transport from '../transport/transport';

export const login = (data) => {
  return Transport.post(
    'http://localhost:3001/api/login',
    JSON.stringify(data)
  );
};

export const getRegisterData = (data) => {
  return Transport.post(
    'http://localhost:3001/api/register',
    JSON.stringify(data)
  );
};

export const getUserData = () => {
  return Transport.get(
    'http://localhost:3001/api/login'
  );
};
