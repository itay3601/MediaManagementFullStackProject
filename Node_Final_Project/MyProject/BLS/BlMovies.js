const DalMovie =require('../Dals/MovieDal')
let movieSarchRezolt={}



const getAllMovies = async function()
{
    return new Promise(async(resolve, reject) =>
        {
           let  allMovies= await DalMovie.getMovis()

            resolve(allMovies)




        })}
    




     const   searchByNameFun =async function ( SearchName) {

        return new Promise(async(resolve, reject) =>
        {
           let  allMovies= await DalMovie.getMovis()
         
              movieSarchRezolt=allMovies.data.filter(movie=>movie.Name.includes(SearchName))
           console.log(movieSarchRezolt)
           resolve(movieSarchRezolt);

           




        })
           
        }

        const AddMovieBL = async function(obj)
          {
           return new Promise(async(resolve, reject) =>
           {
           let  resp= await DalMovie.addIMovie(obj)

            resolve(resp)

        })}



        const UpdateMovieBL = async function(obj,id)
        {
         return new Promise(async(resolve, reject) =>
         {
         let  resp= await DalMovie.UpdateMovie(obj,id)

          resolve(resp)

      })}

      const DelateMovieBL = async function(id)
      {
       return new Promise(async(resolve, reject) =>
       {
       let  resp= await DalMovie.DaleteMovie(id)

        resolve(resp)

    })}



        module.exports = {getAllMovies,searchByNameFun,AddMovieBL,UpdateMovieBL,DelateMovieBL}