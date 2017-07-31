const configRemote = {
  secret: 'MoneyIsPower',
  port: 3001,
  url: 'mongodb://rost:rostsmarthome@ds027688.mlab.com:27688/smart_home'
};

const configLocal = {
  secret: 'MoneyIsPower',
  port: 3001,
  url: 'mongodb://localhost:27017/smart_home'
};

module.exports = configLocal;
