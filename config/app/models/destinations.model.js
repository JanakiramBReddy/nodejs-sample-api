const mongoose = require('mongoose');

const DestinationSchema = mongoose.Schema({
    destinationTitle:String
},{
    timestamps: true
})

module.exports = mongoose.model('Destination',DestinationSchema);