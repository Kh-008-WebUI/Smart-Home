const express = require('express');
const app = express();
const loginRouter = express.Router();

let User = require('../models/user');

loginRouter.route('/').post((req, res) => {
  User.findOne({ 'email': req.body.email },
  (err, user) => {
    if (err) {
      res.status(500).send({
        status: "error",
        text: "Something went wrong, try again later."
      });
    };    
    if (user && user.checkPassword(req.body.password)) {
      req.session.user = user._id;
      res.json({
        name: user.name,
        email: user.email,
        created: user.created
      });
    }
    else {
      res.status(500).send({
        status: "error",
        text: "Wrong login or password."
      });
    }
  });
});

module.exports =  loginRouter;