var express = require('express');
var router = express.Router();
const Bl =require('../BLS/BlUsers');
const session = require('express-session');
const BlMembers =require('../BLS/BLMembers')
const BlMovies =require('../BLS/BlMovies')
const BlSub =require('../BLS/BlSub')
let movies={};
let sub={}
let members={}
let arr={Data:[]}

let movieSarchRezolt=[]
let sarchMovie;
let movieIdToUpdate;






/* GET home page. */


router.get('/',async function (req, res, next) {
    //let sess = req.session;
   
  
    members = await BlMembers.getAllMembers()
    movies = await BlMovies.getAllMovies();
    sub= await BlSub.getAllSub()
    arr={Data:[]}
   

     let newArr= await BlSub.bildArrMovieMmbers(sub,members,arr)
     
  
 
   
    console.log("PRO:"+req.session.Promissions)
     
      if((req.session.Promissions.includes("View Movies"))){
        res.render('TestMoviePage', { Movis:movies,sarchSbmitFlag:false,Sub:arr,Pro:req.session.Promissions });

      }else{
    
      res.render('TestMoviePage', { Movis:{data:[]},sarchSbmitFlag:false,Sub:{Data:[]} ,Pro:req.session.Promissions});
     // res.render('TestMoviePage', { Movis:{data:[]},sarchSbmitFlag:false,Sub:{Data:[]} });


    }
  
     
  
  
  });


  


  
  ///////////////////////////////////////////////////////////////////////////////////////////////
 
  router.get('/SerchMovies:inputSarch', async function (req, res, next) {
  
      sarchMovie=req.query.inputSarch;
      
      movieSarchRezolt= await BlMovies.searchByNameFun(sarchMovie);
    
    
      if((req.session.Promissions.includes("View Movies"))){
  
      res.render('TestMoviePage', { Movis:movies ,SarchRezolt:movieSarchRezolt,sarchSbmitFlag:true,Sub:arr,Pro:req.session.Promissions});
    }else{
    
      res.render('TestMoviePage', { Movis:{data:[]},sarchSbmitFlag:true,SarchRezolt:[],Sub:{Data:[]},Pro:req.session.Promissions
    
      });
     // res.render('TestMoviePage', { Movis:{data:[]},sarchSbmitFlag:false,Sub:{Data:[]} });


    }
   
   
    
   
    //  res.render('MoviePage', { flag:true,Movies:movies });
    
    

  })
  router.post('/AddMovies', async function (req, res, next) {
   
     
      let obj={};
      
      obj.name=req.body.Name;
      obj.image=req.body.Image;
      obj.ganer=req.body.Ganer.split(" ");
      obj.premiered=req.body.Pramire;
   
      
      resp= await BlMovies.AddMovieBL(obj)
    
    
   
  
      res.redirect('http://localhost:8000/MenuePage')
     
     
   
   
    
   
    //  res.render('MoviePage', { flag:true,Movies:movies });
    
    

  })
  router.get("/EditDataMovie/:movieId", async function (req, res, next) {
  
      let id = req.params.movieId;
      //////////////////////////////////
     
      //////////////////////////////////////
  
      movies.data.forEach(movie => {
        let movieName=movie.Name.replace(/\s+/g, '');
        if (movieName == id ) {
          movieIdToUpdate=movie._id
          res.render('EditDataMovie', { movieid: movie });
  
        }
      })
  
      res.render('EditDataMovie');  
  
  });
  router.post("/EditDataMovie/:movieId", async function (req, res, next) {
      let obj={};
      obj.name=req.body.Name;
      obj.image=req.body.Image;
      obj.ganer=req.body.Ganer.split(" ");
      obj.pramierd=req.body.Pramierd;
    
      let resp =await BlMovies.UpdateMovieBL(obj,movieIdToUpdate)

      res.redirect("http://localhost:8000/TestMoviePage")
  
  }
  )
   

  ////////////////////////////////////////////////////////
  router.get("/DaleteMovie/:movieId", async function (req, res, next) {
    let id = req.params.movieId;
    let resp =await BlMovies.DelateMovieBL(id);


   
   res.redirect("http://localhost:8000/TestMoviePage")

  })

  


module.exports = router;
