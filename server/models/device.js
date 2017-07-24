const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    id: Number,
    name: String,
    location: String,
    status: Boolean,
    items:{ type : Array , "default" : [] }
});

module.exports = mongoose.model('Device', deviceSchema);
