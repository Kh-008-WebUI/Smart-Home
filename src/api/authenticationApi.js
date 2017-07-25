import Transport from '../transport/transport';

export const login = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const getRegisterData = (data) => {
  return Transport.post(
    'http://localhost:3001/api/register',
    JSON.stringify(data)
  );
};
