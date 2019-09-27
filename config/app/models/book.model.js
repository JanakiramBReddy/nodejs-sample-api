const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title : String,
    author : String,
    imgUrl : String
},{
    timestamps: true
})

module.exports = mongoose.model('Book',BookSchema);