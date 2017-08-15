const express = require('express');
const registerRouter = express.Router();
const User = require('../models/user');

registerRouter.route('/').post((req, res) => {
  User.find({ email: req.body.email })
    .then( user => {
      if (user.length > 0) {
          res.statusMessage = 'A user with this email already exists.';
          res.status(500).end();
      } else {
        User.create(req.body)
          .then( user => {
            req.session.user = user._id;
            req.session.name = user.name;
            // req.session.userCreatedDate = user.created;
            user.home = true;
            user.save().catch(err => {
              res.statusMessage = 'Unable to update the database.';
              res.status(400).end();
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
          })
          .catch( err => {
            res.statusMessage = 'Could not create user';
            res.status(500).end();
          })
      }
    })
    .catch( err => {
      res.statusMessage = 'Internal server error. Try later.';
      res.status(500).end();
    });
});

module.exports = registerRouter;
