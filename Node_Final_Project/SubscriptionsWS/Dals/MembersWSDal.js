const axios = require('axios');

exports.getMembers = function()
{
    try{
        return axios.get("https://jsonplaceholder.typicode.com/users");

    }catch(eror){
         return eror;
    }
  
}


