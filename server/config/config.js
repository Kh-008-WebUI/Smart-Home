const origin = 'peaceful-mountain-19311.herokuapp.com';
const port = 5000;
const configRemote = {
  secret: 'MoneyIsPower',
  port,
  url: 'mongodb://rost:rostsmarthome@ds027688.mlab.com:27688/smart_home',
  origin
};

const configLocal = {
  secret: 'MoneyIsPower',
  port,
  url: 'mongodb://localhost:27017/smart_home',
  origin
};

module.exports = configRemote;
