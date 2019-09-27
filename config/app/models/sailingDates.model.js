const mongoose = require('mongoose');

const SailingDateSchema = mongoose.Schema({
    sailingDate:String
},{
    timestamps: true
})

module.exports = mongoose.model('SailingDate',SailingDateSchema);