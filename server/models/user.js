const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config/config.js');
const Schema = mongoose.Schema;
const moment = require('moment');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Entered name is too short']
  },
  home: {
    type: Boolean,
    default: false,
    validate: [booleanValidator, 'Field must be boolean']
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required:  true
  },
  created: {
    type: Date,
    default: Date.now,
    validate: [dateValidator, 'Wrong date']
  },
  avatar: String
});

userSchema.methods.encryptPassword = function (password) {
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

function booleanValidator(value) {
  return (value === true || value === 'true' || value === false || value === 'false');
};

function dateValidator(value) {
  return (value <= Date.now());
}