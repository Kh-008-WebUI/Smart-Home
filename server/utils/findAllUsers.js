const User = require('../models/user.js');

module.exports = () => {
  let userList = [];
  let arr = [];

  User.find()
    .then(users => {
      userList = [...users];
    })
    .then(() => {
      userList.forEach((item) => {
        const objItem = {
          userID: item._id,
          status: false
        };


        arr.push(objItem);
      });
      console.log(arr);
      return arr;
    });
};

