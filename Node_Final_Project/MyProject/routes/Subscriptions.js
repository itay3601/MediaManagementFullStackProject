var express = require('express');
var router = express.Router();
const BlMembers =require('../BLS/BLMembers')
const BlMovie =require('../BLS/BlMovies')
const BlSub =require('../BLS/BlSub')

let sub={}
let members={}
let Memberobj={}
let movie={}
let idToEdit;
let memberAndMovie={data:[]}


/* GET users listing. */
router.get('/AllMembers',async function(req, res, next) {
  members = await BlMembers.getAllMembers()
  let tempid;
 
   movie = await BlMovie.getAllMovies()
   sub= await BlSub.getAllSub()
   for(let conter=0;conter<members.data.length;conter++){
   if(sub.data[conter].Movies.length!=0){
    sub.data[conter].Movies.forEach(mov=>{
      tempid= mov.movieId;
      console.log("Tempid :"+tempid)
      movie.data.forEach(item=>{
             if(mov.movieId==item._id){
                 mov.movieId=item.Name
                 let flag=true;
             }
         })
         if( mov.movieId==tempid){
          mov.movieId="movie is deleted"
         }
        
        
     })}
    }
   
  

 
   
  
  if(req.session.Promissions.includes("View Subscriptions")){
    res.render('AllMembers',{flag:true, Members:members,Movies:movie ,Sub:sub,Pro:req.session.Promissions })

  }else{
    res.render('AllMembers',{flag:true, Members:{data:[]},Movies:movie ,Sub:sub,Pro:req.session.Promissions })

  }


});


router.get('/AddMember',async function(req, res, next) {

  members = await BlMembers.getAllMembers()
  if(req.session.Promissions.includes("View Subscriptions")){
 
 res.render('AllMembers',{flag:false, Members:members,Pro:req.session.Promissions})
  }else{
    res.render('AllMembers',{flag:false, Members:{data:[]},Pro:req.session.Promissions})
  }
});


router.get('/AllMembers/Delete/:memberId',async function(req, res, next) {

  let id = req.params.memberId;
  let idsub =await BlSub.getIdobjectSubMachToMemberId(id)
 
 let resp = await BlMembers.DelateMemberBL(id);
 let resp2 =await BlSub.DelateSubBL(idsub)

 res.redirect('http://localhost:8000/Subscriptions/AllMembers')

 
});
router.post('/AddMember/submit',async function(req, res, next) {
  let objMemberToAdd={
    name:req.body.Name,
    email:req.body.Email,
    city:req.body.City

  }
  let resp2 = await BlMembers.AddMemberBL(objMemberToAdd)
  members = await BlMembers.getAllMembers()
  let memberid=members.data[members.data.length-1]._id
  
  
  
  let objSub={
    MemberId:memberid,
    Movies:[]
  }
  let resp =await BlSub.AddSubBL(objSub);


 


  

 res.redirect('http://localhost:8000/Subscriptions/AllMembers')

 
});
router.get('/AllMembers/Edits/:memberName',async function(req, res, next) {
  let MeberName=req.params.memberName;
  console.log(MeberName)
   Memberobj;
  members.data.forEach(m => {
    if(m.Name==MeberName){
      Memberobj=m;
    }
    

    
  });
  idToEdit=Memberobj._id


  
 res.render('EditMeber',{Member:Memberobj});

 
});
router.post('/AllMembers/Edits/:memberName',async function(req, res, next) {
  let MemberToUbdate={
    name:req.body.Name,
    email:req.body.Email,
    city:req.body.City
  }
  let resp= await BlMembers.UpdateMemberBL(MemberToUbdate,idToEdit)

 

  
  res.redirect('http://localhost:8000/Subscriptions/AllMembers')


 
});
router.post('/AllMembers/SubscribeNewMovie',async function(req, res, next) {
  let newMoviePush= { movieId:req.body.movie,Date:req.body.date}
  let MemberID=req.body.memberId;
  let arrMovies;
  let idSub= await BlSub.getIdobjectSubMachToMemberId(MemberID)
  console.log(idSub)
  let allSub= await BlSub.getAllSub()
  allSub.data.forEach(s=>{
    if(s._id==idSub){
      arrMovies=s.Movies;
    }
  })
  arrMovies.push(newMoviePush)
  let newObjSub={
    MemberId:MemberID,
    Movies:arrMovies
    
  }
  let resp = await BlSub.UpdateSubrBL(newObjSub,idSub)


 res.redirect('http://localhost:8000/Subscriptions/AllMembers')

})



module.exports = router;
