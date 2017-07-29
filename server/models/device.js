const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    id: Number,
    name: {
        type: String,
        required: [true, 'You forgot to give a name for device.'],
        min: [3, 'Name of yor device is too short.'],
        max: 18
    },
    location: {
        type: String,
        required: [true, 'Location is required.'],
        enum: ['Living Room','Bedroom','Kitchen', 'Hallway'] /* Не знаю, нужно ли? */
    },
    status: {
        type: Boolean,
        required: [true, 'Status is required.']
    },
    views: {
        type: Number,
        default: 0
    },
    items: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Device', deviceSchema);
