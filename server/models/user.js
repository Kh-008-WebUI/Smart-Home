const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  home: Boolean,
  email: String,
  password: String,
  isLogged: Boolean
});

module.exports = mongoose.model('User', userSchema);
