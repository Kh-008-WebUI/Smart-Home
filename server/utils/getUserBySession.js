const User = require('../models/user.js');

module.export = (userId, response) => {
  User.findById(userId, (err, user) => {
    if (err) {
      response.statusMessage = 'Something went wrong, try again later.';
      response.status(500).end();
    }
    if (!user) {
      response.statusMessage = 'Something went wrong, try again later.';
      response.status(500).end();
    }
  });
};
