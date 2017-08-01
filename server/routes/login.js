const express = require('express');
const app = express();
const loginRouter = express.Router();
const User = require('../models/user');

loginRouter.route('/')
  .get((req, res) => {
    User.findOne({ '_id': req.session.user },
    (err, user) => {
      if (err) {
        res.status(500).send({
          status: "error",
          text: "Something went wrong, try again later."
        });
      };    
      if (user) {
        res.status(200).send({
          status: true,
          userData: {
            _id: user._id,
            name: user.name,
            email: user.email,
            created: user.created
          }
        });
      }
      else {
        res.status(500).send({
          status: "error",
          text: "Wrong login or password."
        });
      }
    });
  })
  .post((req, res) => {
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
        res.status(200).send({
          status: true,
          userData: {
            _id: user._id,
            name: user.name,
            email: user.email,
            created: user.created
          }
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

module.exports = loginRouter;
