const mongoose = require('mongoose');

const geoDataSchema = new mongoose.Schema({
    location: {
        type: {
            lat: Number,
            lon: Number
        },
        required: true
    },
    weather: {
        temperature: Number,
        humidity: Number,
        description: String,
        windSpeed: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GeoData', geoDataSchema); 