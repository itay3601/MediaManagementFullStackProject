const jfile = require('jsonfile');

const puth = './JasonFiles/Premissions.json';
let file={};



const getUserPermissins= function(){
    try {
       return jfile.readFile(puth);
        
    } catch (error) {
        return error;
        
    }
  
   
}
const whriteToUserPromissionsJason=function(obj){
   
    try {
        return jfile.writeFile(puth,obj);
         
     } catch (error) {
         return error;
         
     }


}
module.exports = {getUserPermissins,whriteToUserPromissionsJason}