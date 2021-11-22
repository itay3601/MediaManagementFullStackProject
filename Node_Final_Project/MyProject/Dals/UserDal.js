const jfile = require('jsonfile');




const puth = './JasonFiles/Users.json';
let file={};








 const getUserList= function(){
    try {
       return jfile.readFile(puth);
        
    } catch (error) {
        return error;
        
    }
  
   
}

  

const whriteToUserJason=function(obj){
   
    try {
        return jfile.writeFile(puth,obj);
         
     } catch (error) {
         return error;
         
     }


}

module.exports = {getUserList,whriteToUserJason}