var express = require('express');
var router = express.Router();
const Bl =require('../BLS/BlUsers');
const session = require('express-session');
const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/CretaeAccount', function(req, res, next) {
  res.render('CretaeAccount', { title: 'CretaeAccount' });
});





router.post('/getDataLogin', async function (req, res, next) {

  let username = req.body.userName;
  let pass = req.body.pass;
  let rezolt = await Bl.getAllUsersDB(username,pass);
  if(rezolt==true){
    const userId= await Bl.getIdSercheByName(username)
    let UserP = await Bl.getPromissionsByIdFromJason(userId)
    req.session.Promissions=UserP.permissions
   
    
  
      
           
           
          
            res.redirect("/MenuePage")
                        
       



    ///////////////////////////////////////////////////
     
      
      

    
 

  }else{
 
    res.redirect('/');
  }




})
router.post('/getDataCreate', async function (req, res, next) {

  let userName = req.body.userName;
  let Password = req.body.pass;
  obj={username:userName,
    pass:Password
  }
  let id= await Bl.getIdSercheByName(userName)
  let rezolt = await Bl.updateUsrer(id,obj);
  if(rezolt=="Updated"){
    res.redirect('/');


  }
  
    
  




})

module.exports = router;
