const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/models/userModel');

const db = mongoose
  .connect('mongodb://smarthouse:smarthouse@ds111123.mlab.com:11123/smarthome');
const app = express();
const router = express.Router();

const port = process.env.API_PORT || 8081;


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api', router);

router.route('/users')
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(users);
      }
    });
  });

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});

app.get('/', function (req, res) {
  res.send('welcome to my API!');
});
