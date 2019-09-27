const mongoose = require('mongoose');

const CruiseSchema = mongoose.Schema({
    cruiseTitle: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Cruise', CruiseSchema);