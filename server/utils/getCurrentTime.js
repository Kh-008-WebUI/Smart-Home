function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }

    return i;
};

module.exports = () => {
  const currentdate = new Date();
  const dateTime = currentdate.getDate() + '/'
    + (currentdate.getMonth() + 1) + '--'
    + addZero(currentdate.getHours()) + ':'
    + addZero(currentdate.getMinutes());

  return dateTime;
};
