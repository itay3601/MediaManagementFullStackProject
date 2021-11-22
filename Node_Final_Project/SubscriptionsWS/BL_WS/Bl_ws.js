const memberDal =require('../Dals/MembersWSDal')
const MoviesrDal =require('../Dals/MoviesWSDal');
const { createCollection } = require('../Models/MembersModel');
const MembersModel = require('../Models/MembersModel');
const MoviesModel = require('../Models/MoviesModel');
const MoviesMembersModel = require('../Models/SubscriptionsMovieMembers');
let Members={}
let Movies={}




  createCollectionOfMembers= async function(){
     return new Promise(async(resolve,reject)=>{
         members=await memberDal.getMembers()
        members.data.forEach(member=>{
            const m= new MembersModel({
              
                Name : member.name,
                Email : member.email,
                City : member.address.city,
                
            });

            m.save(function(err) 
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
     })
    


 }

 createCollectionOfMovies= async function(){
    return new Promise(async(resolve,reject)=>{
        Movies=await MoviesrDal.getMovies();
        console.log("bl create collehen"+Movies.data.length)
        Movies.data.forEach(movie=>{
           const m= new MoviesModel({

            Name : movie.name,
            Image : movie.image.medium,
            Genres:movie.genres,
            Premiered : movie.premiered,
             
               
               
           });

           m.save(function(err) 
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
    })
   


}
 



const addMembers = function(members)
{
    return new Promise((resolve, reject) =>
        {
            const m= new MembersModel({
              
                Name : members.name,
                Email : members.email,
                City : members.city,
                
            });

            m.save(function(err) 
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
const updateMember = function(id,members)
{
    return new Promise((resolve, reject) =>
    {
        MembersModel.findByIdAndUpdate(id,
            {
                Name : members.name,
                Email : members.email,
                City : members.city,
                 

               
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

const deleteMember = function(id)
{
    return new Promise((resolve, reject) =>
    {
        MembersModel.findByIdAndDelete(id, function(err) 
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




const getAllMembers = function()
{
    return new Promise((resolve, reject) =>
        {
            MembersModel.find({}, function(err,membs) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(membs);
                }
            })
        })
}

const getAllMovies = function()
{
    return new Promise((resolve, reject) =>
        {
            MoviesModel.find({}, function(err,movies) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                  
                    resolve(movies);
                }
            })
        })
}

const addMovie = function(movie)
{
    return new Promise((resolve, reject) =>
        {
            const m= new MoviesModel({
              
                Name : movie.name,
                Genres: movie.ganer,
                Image : movie.image,
                Premiered : movie.premiered,
                
            });

            m.save(function(err) 
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



const updateMovie = function(id,movie)
{
    return new Promise((resolve, reject) =>
    {
        MoviesModel.findByIdAndUpdate(id,
            {
                Name : movie.name,
                
                Image : movie.image,
                Genres: movie.ganer,
                 

                Premiered : movie.premiered,
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


const deleteMovie = function(id)
{
    return new Promise((resolve, reject) =>
    {
        MoviesModel.findByIdAndDelete(id, function(err) 
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


const getMovie = function(id)
{
    return new Promise((resolve, reject) =>
        {
            MoviesModel.findById(id, function(err,per) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(per);
                }
            })
        })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAllSubscrption = function()
{
    return new Promise((resolve, reject) =>
        {
            MoviesMembersModel.find({}, function(err,membs) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(membs);
                }
            })
        })
}
const addSub = function(members)
{
    return new Promise((resolve, reject) =>
        {
            const m= new  MoviesMembersModel({
              
                MemberId:members.MemberId,
                Movies:members.Movies
                
            });

            m.save(function(err) 
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
const updateSub = function(id,members)
{
    return new Promise((resolve, reject) =>
    {
        MoviesMembersModel.findByIdAndUpdate(id,
            {
                MemberId:members.MemberId,
                Movies:members.Movies
                 

               
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

const deleteSub = function(id)
{
    return new Promise((resolve, reject) =>
    {
        MoviesMembersModel.findByIdAndDelete(id, function(err) 
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
createCollectionOfSub= async function(){
    return new Promise(async(resolve,reject)=>{
        let members=await getAllMembers()
        console.log(members)
       members.forEach(member=>{
           const m= new MoviesMembersModel({
            MemberId:member._id,
            Movies:[]
           });

           m.save(function(err) 
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
    })
   


}
const getSub = function(id)
{
    return new Promise((resolve, reject) =>
        {
            MoviesMembersModel.findById(id, function(err,per) 
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(per);
                }
            })
        })
}
//createCollectionOfMembers().then(data=>console.log(data))
//createCollectionOfSub().then(data=>console.log(data))





module.exports = {addMembers,getAllMembers,getAllMovies,addMovie,updateMovie,deleteMovie,
getMovie,deleteMember,updateMember,getAllSubscrption,addSub,deleteSub,updateSub,getSub}