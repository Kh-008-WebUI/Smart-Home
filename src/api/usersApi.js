// import users from '../data/users.json';
import axios from 'axios';

/*
export const usersList0 = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ users });
  }, 2000);
});
*/

export const usersList = () => (
  axios.get('http://localhost:8081/api/users')
    .then(res => ({ users: res.data })));
