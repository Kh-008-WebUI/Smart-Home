const express = require('express');
const app = express();
const registerRouter = express.Router();

let User = require('../models/user');

registerRouter.route('/').post((req, res) => {

  User.create(req.body, (err, user) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(user);
    };
  });
});

module.exports =  registerRouter;