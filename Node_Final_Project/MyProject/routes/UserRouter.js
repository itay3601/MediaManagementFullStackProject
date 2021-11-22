var express = require('express');
var router = express.Router();
const Bl =require('../BLS/BlUsers');
const session = require('express-session');
const BlMovies =require('../BLS/BlMovies')
const BlUsers = require ('../BLS/BlUsers');
const { render } = require('../app');
let arrUsr={};
let arrUserJason={};
let arrUserPromission={};
let idEdit;
let userJasonEdit;
let promissionsjasonEdit;
let userDbEdit;








/* GET home page. */



  router.get('/AllUser',async function (req, res, next) {
      
      arrUsr = await BlUsers.getAllUsers();
      arrUserJason =await BlUsers.getUserJason();
      arrUserPromission= await BlUsers.getUserPromissionsJason()

      

      
   
    res.render('UserPage',{flag:true,Users:arrUsr,UsersJason:arrUserJason,Promissions:arrUserPromission});
  
  
  });
  router.get('/AddUser',async function (req, res, next) {
   
    res.render('UserPage',{flag:false});
  
  
  });
  router.post('/AddUser',async function (req, res, next) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
    console.log(today)
  

    let objDB={
        UserName:req.body.Uname,
        Password:""
    }
    let resp0=await BlUsers.addUser(objDB)
    arrUsr = await BlUsers.getAllUsers();
  
    let idDB= arrUsr[arrUsr.length-1]._id;





    let objUserJason={
        id:idDB,
      FirstName:req.body.Fname,
      LastName:req.body.Lname,
      CreatedDate:today,
      SessionTimeOut:req.body.Time

    }
    let objPremissionsJason={
        id:idDB,
        permissions:[]
    }

    if(req.body.View_Subscriptions){
        objPremissionsJason.permissions.push('View Subscriptions')

    }
    if(req.body.Create_Subscriptions){
        objPremissionsJason.permissions.push('Create Subscriptions')

    } if(req.body.Delete_Subscriptions){
        objPremissionsJason.permissions.push('Delete Subscriptions')

    } if(req.body.Update_Subscriptions){
        objPremissionsJason.permissions.push('Update Subscriptions')

    } if(req.body.View_Movies){
        objPremissionsJason.permissions.push('View Movies')

    } if(req.body.Create_Movies){
        objPremissionsJason.permissions.push('Create Movies')

    } if(req.body.Delete_Movies){
        objPremissionsJason.permissions.push('Delete Movies')

    } if(req.body.Update_Movies){
        objPremissionsJason.permissions.push('Update Movies')

    }
    
  
   
    let resp1= await BlUsers.AddUserToJason(objUserJason);
    let rep2= await BlUsers.AddUserPromissionsToJason(objPremissionsJason)
   







  




    
    res.redirect('http://localhost:8000/UserPage/AllUser')
   
  
  
  
  });
  router.get("/AllUser/Delete/:userId", async function (req, res, next) {
    let id = req.params.userId;
    arrUsr = await BlUsers.getAllUsers();
    arrUserJason =await BlUsers.getUserJason();
    arrUserPromission= await BlUsers.getUserPromissionsJason()



    


    let resp0=await BlUsers.deleteUserFromDB(id)
    let resp1=await BlUsers.DeleteUserFromJAson(id)
    let resp2=await BlUsers.DeleterPromissionsToJason(id)



  



  
   res.redirect("http://localhost:8000/UserPage/AllUser")

  })



  router.get("/AllUser/Edit/:ferstName", async function (req, res, next) {
    let fName = req.params.ferstName;
     idEdit;
    arrUserJason =await BlUsers.getUserJason();
    arrUserJason.forEach(u => {
        if(u.FirstName==fName){
            idEdit=u.id;

        }
        
    });

    console.log("IDD  : "+idEdit)
     userJasonEdit= await BlUsers.getUserByIdFromJason(idEdit)
     promissionsjasonEdit= await BlUsers.getPromissionsByIdFromJason(idEdit)
     userDbEdit = await BlUsers.getUUserByIdFromDb(idEdit)

  
   









    res.render('EditPage',{Ujason:userJasonEdit,Pjason:promissionsjasonEdit ,UserDb:userDbEdit})
    
   

  
  

  })

  router.post("/AllUser/Edit/:ferstName", async function (req, res, next) {

    
    let objDB={
        username:req.body.Uname,
        pass:userDbEdit.Password
    }
    let objUserJason={
        id:idEdit,
      FirstName:req.body.Fname,
      LastName:req.body.Lname,
      CreatedDate: req.body.Date,
      SessionTimeOut:req.body.Time

    }
    let objPremissionsJason={
        id:idEdit,
        permissions:[]
    }

    if(req.body.View_Subscriptions){
        objPremissionsJason.permissions.push('View Subscriptions')

    }
    if(req.body.Create_Subscriptions){
        objPremissionsJason.permissions.push('Create Subscriptions')

    } if(req.body.Delete_Subscriptions){
        objPremissionsJason.permissions.push('Delete Subscriptions')

    } if(req.body.Update_Subscriptions){
        objPremissionsJason.permissions.push('Update Subscriptions')

    } if(req.body.View_Movies){
        objPremissionsJason.permissions.push('View Movies')

    } if(req.body.Create_Movies){
        objPremissionsJason.permissions.push('Create Movies')

    } if(req.body.Delete_Movies){
        objPremissionsJason.permissions.push('Delete Movies')

    } if(req.body.Update_Movies){
        objPremissionsJason.permissions.push('Update Movies')

    }
    console.log(objDB)
    console.log(objPremissionsJason)
    console.log(objUserJason)

     let resp0=await BlUsers.updateUsrer(idEdit,objDB)
     let resp1=await BlUsers.updatePromissionsToJason(idEdit,objPremissionsJason)
     let resp2=await BlUsers.updateUserToJason(idEdit,objUserJason)

    


    res.redirect("http://localhost:8000/UserPage/AllUser")
  })
  


  
  ///////////////////////////////////////////////////////////////////////////////////////////////
 
 
  


module.exports = router;
