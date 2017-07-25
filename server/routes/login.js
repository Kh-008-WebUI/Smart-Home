const express = require('express');
const app = express();
const loginRouter = express.Router();

let User = require('../models/user');

loginRouter.route('/').post((req, res) => {
  console.log(req.body);

  User.create(req.body, (err, user) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(user);
    };
  });
});

module.exports =  loginRouter;