import users from '../data/users.json';

const usersList = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ users });
  }, 2000);
});

export default usersList;
