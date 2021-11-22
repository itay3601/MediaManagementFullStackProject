const mongoose = require('mongoose');

let MoviesMembers = new mongoose.Schema({
    MemberId:String,
    Movies:[{movieId :String,Date : String}]

 
  
    
});

module.exports = mongoose.model('sub',MoviesMembers);

