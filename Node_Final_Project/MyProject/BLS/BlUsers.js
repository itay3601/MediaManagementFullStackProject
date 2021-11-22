const DalUser =require('../Dals/UserDal')
const DalPer =require('../Dals/PremissionsDal')

const UserModel = require('../Models/UsersModel')

let bol =false;
let id="";

const getAllUsers = function(username,pass)
{
    return new Promise((resolve, reject) =>
        {
           
            UserModel.find({}, function(err,users) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                   
                    resolve(users);
                }
            })
        })
}




const getAllUsersDB = function(username,pass)
{
    return new Promise((resolve, reject) =>
        {
            bol=false;
           
            UserModel.find({}, function(err,users) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                   
                    users.forEach(user=>{
                        
                        if(user.UserName==username&&user.Password==pass){
                            bol=true;
                        }
                    })
                    console.log(bol);
                    resolve(bol);
                }
            })
        })
}
const updateUsrer = function(id,per)
{
    return new Promise((resolve, reject) =>
    {
        UserModel.findByIdAndUpdate(id,
            {
                UserName  : per.username,
                Password  : per.pass,
             
            }, function(err) 
             {       
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Updated');
            }
        })
    })
}


const getIdSercheByName=function(username){
    return new Promise((resolve,reject)=>{
        UserModel.find({}, function(err,users) 
        {
            if(err)
            {
                reject(err);
            }
            else
            {
               
                users.forEach(user=>{
                    
                    if(user.UserName==username){
                        id=user._id;
                    }
                })
                console.log(id);
                resolve(id);
            }
        })











    })
}
const AddUserToJason=  function(obj){
    return new Promise(async(resolve,reject)=>{
       



        let Users= await DalUser.getUserList();
        console.log(Users)
       
        Users.Users.push(obj);
        let NewUsera=await DalUser.whriteToUserJason(Users);
       resolve("creted");

            




    })
}
const AddUserPromissionsToJason=  function(obj){
    return new Promise(async(resolve,reject)=>{
       



        let Prem= await DalPer.getUserPermissins();
       
        Prem.PermissionsToUser.push(obj);
        let NewUsera=await DalPer.whriteToUserPromissionsJason(Prem);
       resolve("creted");

            




    })
}
   









        const addUser = function(user)
{
    return new Promise((resolve, reject) =>
        {
            const u= new UserModel({
              
                UserName : user.UserName,
                Password : user.Password,
               
                
            });

            u.save(function(err) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Created');
                }
            })
        })
}
const getUserPromissionsJason=  function(){
    return new Promise(async(resolve,reject)=>{
       



        let Prem= await DalPer.getUserPermissins();
       
        
       resolve(Prem.PermissionsToUser);

            




    })
}
const getUserJason=  function(){
    return new Promise(async(resolve,reject)=>{
       



        let users= await DalUser.getUserList();
       
        
       resolve(users.Users);

            




    })

}
const deleteUserFromDB = function(id)
{
    return new Promise((resolve, reject) =>
    {
        UserModel.findByIdAndDelete(id, function(err) 
             {       
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Deleted');
            }
        })
    })
}
const DeleteUserFromJAson=  function(id){
    return new Promise(async(resolve,reject)=>{
       



        let Users= await DalUser.getUserList();
        let arrAfterDelete={Users:[]}
         arrAfterDelete.Users =Users.Users.filter(user=>user.id!=id)
      
       
        let NewUsera=await DalUser.whriteToUserJason(arrAfterDelete);
       resolve("creted");

            




    })
}
const DeleterPromissionsToJason=  function(id){
    return new Promise(async(resolve,reject)=>{
       



        let Prem= await DalPer.getUserPermissins();
       
      let arrPerm={PermissionsToUser:[]}
         arrPerm.PermissionsToUser =Prem.PermissionsToUser.filter(prem=>prem.id!=id)
        let NewUsera=await DalPer.whriteToUserPromissionsJason(arrPerm);
       resolve("creted");

            




    })
}



const  updateUserToJason=  function(id,obj){
    return new Promise(async(resolve,reject)=>{
       



        let Users= await DalUser.getUserList();
       
     
        Users.Users.forEach(element => {
             if(element.id==id){
                 element.id=obj.id;
                 element.FirstName=obj.FirstName;
                 element.CreatedDate=obj.CreatedDate;
                 element.SessionTimeOut=obj.SessionTimeOut;

             }
             
         });
        let NewUsera=await DalUser.whriteToUserJason(Users);
       resolve("creted");

            




    })
}

const  updatePromissionsToJason=  function(id,obj){
    return new Promise(async(resolve,reject)=>{
       



        let Prem= await DalPer.getUserPermissins();
       
     
         Prem.PermissionsToUser.forEach(element => {
             if(element.id==id){
                 element.id=obj.id
                 element.permissions=obj.permissions

             }
             
         });
        let NewUsera=await DalPer.whriteToUserPromissionsJason(Prem);
       resolve("creted");

            




    })
}
const getUserByIdFromJason=  function(id){
    return new Promise(async(resolve,reject)=>{
       

     let obj={};

        let Users= await DalUser.getUserList();
        Users.Users.forEach(u=>{
            if(u.id==id){
               obj=u;

            }
        })

       
       
     
       
        resolve(obj);

            




    })
}
const getPromissionsByIdFromJason=  function(id){
    return new Promise(async(resolve,reject)=>{
       

     let obj={};

        let Prem= await DalPer.getUserPermissins();
        Prem.PermissionsToUser.forEach(p=>{
            if(p.id==id){
               obj=p;

            }
        })

       
       
     
       
        resolve(obj);

            




    })
}
const getUUserByIdFromDb=  function(id){
    return new Promise(async(resolve,reject)=>{
       

     let obj={};
     let arrUsr = await getAllUsers();
       
     arrUsr.forEach(u=>{
            if(u.id==id){
               obj=u;

            }
        })

       
       
     
       
        resolve(obj);

            




    })
}








module.exports = {getAllUsersDB,updateUsrer,getIdSercheByName,getAllUsers,AddUserToJason,addUser,AddUserPromissionsToJason,
               getUserPromissionsJason,getUserJason,deleteUserFromDB,DeleterPromissionsToJason,DeleteUserFromJAson,getUserByIdFromJason,
               getPromissionsByIdFromJason,getUUserByIdFromDb,updatePromissionsToJason,updateUserToJason}