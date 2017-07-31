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
<<<<<<< HEAD
          status: "500",
=======
          status: "error",
>>>>>>> 280a7e2fed160558be228209f1be5d5652d0b96f
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
<<<<<<< HEAD
            res.json(user);
=======
            res.status(200).send(user);
>>>>>>> 280a7e2fed160558be228209f1be5d5652d0b96f
          };
        })
      };
  });
});

module.exports =  registerRouter;
