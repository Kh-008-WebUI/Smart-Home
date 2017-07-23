var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Device = new Schema({
    id: Number,
    name: String,
    location: String,
    status: Boolean,
    items:{ type : Array , "default" : [] }
});

module.exports = mongoose.model('Device', Device);
