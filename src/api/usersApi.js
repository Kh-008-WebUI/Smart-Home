import users from '../data/users.json';

export const usersList = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ users });
  }, 2000);
});

