module.exports = () => {
  const currentdate = new Date();
  const dateTime = currentdate.getDate() + '/'
    + (currentdate.getMonth() + 1) + '--'
    + currentdate.getHours() + ':'
    + currentdate.getMinutes();

  return dateTime;
};
