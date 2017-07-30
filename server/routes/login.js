const express = require('express');
const app = express();
const loginRouter = express.Router();

let User = require('../models/user');

loginRouter.route('/').post((req, res) => {
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
    }
    else if (user && user.checkPassword(req.body.password)) {
      req.session.user = user._id;
      res.json(
        {
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
      res.send(403);
    }
  });
});

module.exports = loginRouter;
