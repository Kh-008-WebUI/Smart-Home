const express = require('express');
const app = express();
const registerRouter = express.Router();

let User = require('../models/user');

registerRouter.route('/').post((req, res) => {
  User.find(
    {email: req.body.email},
    (err, user) => {
      if (err) console.log(err);
      if (user.length > 0) {
        console.log('there is user with this email');
      } else {
        User.create(req.body, (err, user) => {
          if (err) console.log(err);
          res.json(user);
        });
      }
    });
    
});

module.exports =  registerRouter;
