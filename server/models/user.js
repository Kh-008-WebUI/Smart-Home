const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config/config.js');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  home: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    unique: true,
    required:  true
  },
  hashedPassword: {
    type: String,
    required:  true
  },
  created: {
    type: Date,
    default: Date.now
  },
  avatar: String
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha256', config.secret)
    .update(password)
    .digest('hex');
};

userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = config.secret;
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', userSchema);
