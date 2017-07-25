const express = require('express');
const app = express();
const loginRouter = express.Router();

let User = require('../models/user');

loginRouter.route('/').post((req, res) => {
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if(err) {
      console.log(err);
    }
    else if(user && req.body.password === user.password) {
      req.session.user = user._id;
      res.json({name:user.name, email: user.email});
    }
    else {
      res.send(403);
    }
  });
});

module.exports =  loginRouter;