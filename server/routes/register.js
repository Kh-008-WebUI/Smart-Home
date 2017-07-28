const express = require('express');
const app = express();
const registerRouter = express.Router();

let User = require('../models/user');

registerRouter.route('/').post((req, res) => {
  User.findOne(
    {email: req.body.email},
    (err, user) => {
      if (err) console.log(err);
      if (user) {
        console.log("There is such email");
        res.send(500);
      } else {
        User.create(req.body, (err, user) => {
          if (err) console.log(err);
          res.json(user);
        });
      }
    });
    
});

module.exports =  registerRouter;
