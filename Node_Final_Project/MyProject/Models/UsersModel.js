const mongoose = require('mongoose');

let Users = new mongoose.Schema({
   
    UserName : String,
    Password : String,
    
    
});

module.exports = mongoose.model('users',Users);

