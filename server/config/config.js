const development = 'development' === process.env.NODE_ENV;

const origin = development ? 'http://localhost:8081' : 'http://localhost:3001';

const configRemote = {
  secret: 'MoneyIsPower',
  port: 3001,
  url: 'mongodb://rost:rostsmarthome@ds027688.mlab.com:27688/smart_home',
  origin
};

const configLocal = {
  secret: 'MoneyIsPower',
  port: 3001,
  url: 'mongodb://localhost:27017/smart_home'
};

module.exports = configRemote;
