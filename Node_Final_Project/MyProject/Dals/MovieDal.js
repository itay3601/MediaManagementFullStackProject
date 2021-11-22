const axios = require('axios');
const { count } = require('../Models/UsersModel');
const url='http://localhost:3000/api/Movies'

const getMovis = function()
{
    try{
        return axios.get(url);

    }catch(eror){
         return eror;
    }
  
}
const addIMovie = function(obj)
{
    try{
        return axios.post(url, obj);
    
}catch(eror){
    return eror;
}
  
}



const UpdateMovie = function(obj,id)
{
    try{
        return axios.put(url + "/" + id, obj);
    
}catch(eror){
    return eror;
}
  
}
const DaleteMovie = function(id)
{
    try{
        return axios.delete(url + "/" + id);
    
}catch(eror){
    return eror;
}
  
}
const getMovie = function(id)
{
    try{
        return axios.get(url + "/" + id);

    }catch(eror){
         return eror;
    }
  
}



module.exports = {getMovis,addIMovie,UpdateMovie,DaleteMovie,getMovie}
