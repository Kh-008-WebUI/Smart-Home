const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    id: Number,
    name: String,
    location: String,
    status: Boolean,
    views: {
        type: Number,
        default: 0
    },
    items:{ type : Array , "default" : [] }
});

deviceSchema.methods.calculateViewsOfDevices = function() {
    console.log('calculateViewsOfDevices', this.views);
    return this.views += 1;
}


module.exports = mongoose.model('Device', deviceSchema);
