const mongoose = require('mongoose');

let Movies = new mongoose.Schema({
    Name : String,
    Genres : [String],
    Image : String,
    Premiered : Date
});

module.exports = mongoose.model('movies',Movies);

