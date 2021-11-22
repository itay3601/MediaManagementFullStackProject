const axios = require('axios');
const url='http://localhost:3000/api/Members'

const getMembers = function()
{
    try{
        return axios.get(url);

    }catch(eror){
         return eror;
    }
  
}
const addMember = function(obj)
{
    try{
        return axios.post(url, obj);
    
}catch(eror){
    return eror;
}
  
}



const UpdateMember = function(obj,id)
{
    try{
        return axios.put(url + "/" + id, obj);
    
}catch(eror){
    return eror;
}
  
}
const DaleteMember = function(id)
{
    try{
        return axios.delete(url + "/" + id);
    
}catch(eror){
    return eror;
}
  
}



module.exports = {DaleteMember,UpdateMember,addMember,getMembers}
