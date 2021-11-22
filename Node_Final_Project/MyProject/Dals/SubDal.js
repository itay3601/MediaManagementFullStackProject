const axios = require('axios');
const url='http://localhost:3000/api/Sub'

const getSub = function()
{
    try{
        return axios.get(url);

    }catch(eror){
         return eror;
    }
  
}
const addSub = function(obj)
{
    try{
        return axios.post(url, obj);
    
}catch(eror){
    return eror;
}
  
}



const UpdateSub = function(obj,id)
{
    try{
        return axios.put(url + "/" + id, obj);
    
}catch(eror){
    return eror;
}
  
}
const DaleteSub = function(id)
{
    try{
        return axios.delete(url + "/" + id);
    
}catch(eror){
    return eror;
}
  
}
const getsubByid = function(id)
{
    try{
        return axios.get(url + "/" + id);

    }catch(eror){
         return eror;
    }
  
}




module.exports = {DaleteSub,UpdateSub,addSub,getSub,getsubByid}
