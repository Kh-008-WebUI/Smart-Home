const express = require('express');
const app = express();
const registerRouter = express.Router();

let User = require('../models/user');

registerRouter.route('/').post((req, res) => {
  User.find(
    {email: req.body.email},
    (err, user) => {
      if (err) {
        res.status(500).send({
          status: "error",
          text: "Internal server error. Try later."
        });
      };
      if (user.length > 0) {
        res.status(500).send({
          status: "500",
          text: "A user with this email already exists."
        });
      } else {
        User.create(req.body, (err, user) => {
          if (err) {
            res.status(500).send({
              status: "error",
              text: "Could not create user."
            });
          } else {
            res.json(user);
          };
        })
      };
  });
});

module.exports =  registerRouter;
