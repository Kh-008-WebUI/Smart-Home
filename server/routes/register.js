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
          status: "error",
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
          };
        })
      };
  });
});

module.exports =  registerRouter;
