const mongoose = require('mongoose');

var stopsSchema = new mongoose.Schema({
    stopId: {
        type: Number,
        unique: true,
        required: true
    },
    arName: {
        type: String,
        required: true
    },
    enName: {
        type: String
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('stop', stopsSchema, 'stop');