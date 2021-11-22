var express = require('express');
var router = express.Router();
const Bl =require('../BLS/BlUsers');
const session = require('express-session');
const jwt = require('jsonwebtoken');



/* GET home page. */


router.get('/', function (req, res, next) {
   
   // console.log(req,session.Promissions)
    res.render('MenuePage', { flag: "admin" });
   





















    //let sess = req.session;
   
    
  
  
  });


module.exports = router;
