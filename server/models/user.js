const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config/config.js');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: [3, 'Name is too short.'],
    max: 18
  },
  home: Boolean,
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: '{Value} is not a valid email.'
    },
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
  isLogged: Boolean
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
    console.log(this);
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', userSchema);
