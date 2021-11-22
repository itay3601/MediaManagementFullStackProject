const axios = require('axios');

exports.getMovies = function()
{
    try{
        return axios.get("https://api.tvmaze.com/shows?page=0");

    }catch(eror){
         return eror;
    }
  
}


