module.exports = () => {
  const currentdate = new Date();
  const dateTime = currentdate.getDate() + '/'
    + (currentdate.getMonth() + 1) + '/'
    + currentdate.getFullYear() + ' -- '
    + currentdate.getHours() + ':'
    + currentdate.getMinutes() + ':'
    + currentdate.getSeconds();

  return dateTime;
};
