const mongoose = require('mongoose');

let Members = new mongoose.Schema({
   
    Name : String,
    Email : String,
    City : String
    
});

module.exports = mongoose.model('members',Members);

