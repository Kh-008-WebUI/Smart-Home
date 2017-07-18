export const login = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const getRegisterData = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 1000);
  });
};
