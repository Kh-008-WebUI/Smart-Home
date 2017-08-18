module.exports = (users) => {
  let userList = [...users];
  let arrUsersStatus = [];
  let objItem = {};

  userList.forEach((item) => {
    objItem = {
      userID: item._id,
      status: false
    };
    arrUsersStatus.push(objItem);
  });
  return arrUsersStatus;
};

