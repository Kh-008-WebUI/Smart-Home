const express = require('express');
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
        user.home = true;
        user.save().catch(err => {
              res.status(400).send("unable to update the database");
        });
        res.status(200).send({
          status: true,
          userData: {
            _id: user._id,
            name: user.name,
            email: user.email,
            created: user.created
          }
        });
      } else {
        res.status(500).send({
          status: "error",
          text: "This email is not registered."
        });
      }
    });
  });

module.exports = loginRouter;
