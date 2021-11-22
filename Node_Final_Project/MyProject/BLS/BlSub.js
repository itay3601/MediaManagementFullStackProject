const DalSub =require('../Dals/SubDal')
const DalMember =require('../Dals/MembersDal')
const DalMovie =require('../Dals/MovieDal')

let memberAndMovie={data:[]}
let object={}

const getAllSub = async function()
{
    return new Promise(async(resolve, reject) =>
        {
           let  allMembers= await DalSub.getSub()

            resolve(allMembers)




        })}

        const DelateSubBL =  function(id)
        {
         return new Promise(async(resolve, reject) =>
         {
         let  resp= await DalSub.DaleteSub(id)
  
          resolve(resp)
  
      })}

      const AddSubBL = async function(obj)
          {
           return new Promise(async(resolve, reject) =>
           {
           let  resp= await DalSub.addSub(obj)

            resolve(resp)

        })}
        const getSubByIdBL = async function(id)
          {
           return new Promise(async(resolve, reject) =>
           {
           let  resp= await DalSub.getsubByid(id)

            resolve(resp)

        })}

        const UpdateSubrBL = async function(obj,id)
        {
         return new Promise(async(resolve, reject) =>
         {
         let  resp= await DalSub.UpdateSub(obj,id)

          resolve(resp)

      })}
      const getIdobjectSubMachToMemberId = async function(memberID)
      {
       return new Promise(async(resolve, reject) =>
       {
           let id;
       let  resp= await getAllSub()
       resp.data.forEach(element => {
           if(element.MemberId==memberID){
               id=element._id

           }
           
       });

        resolve(id)

    })}


    const BildobjectMemberAndMovie =  function(members,Movie,sub)
    {
     return  new Promise (async(resolve, reject) =>
     {
     
    

      let conter =0;
         members.data.forEach(async m=>{

            if(sub.data[conter].Movies.length!=0){
           sub.data[conter].Movies.forEach(mov=>{
                Movie.data.forEach(item=>{
                    
                    //----AVIV THE KING----
                    if(mov.movieId==item._id){
                        mov.movieId=item.Name
                    }
                })
                
            })}
            // let objectMovie=Movie.data.filter(item=>item._id==mov.movieId)
            // mov.movieId=objectMovie.Name
           
         
          let objToPush={
            _id:m._id,
            Name:m.Name,
            Email:m.Email,
            City:m.City,
            Movies:sub.data[conter].Movies
      
      
          }
        
          memberAndMovie.data.push(objToPush)
          conter=conter+1
          
        
         
         
        })
         
     
       
      resolve(memberAndMovie)

  })
 

}


async function printFiles () {

    let members = await  DalMember.getMembers() 
 
  
    
         
        members.data.forEach(async (m) => {
      const idsub =await getIdobjectSubMachToMemberId(m._id)
      const movie =await getSubByIdBL(idsub)
      let objToPush={
        _id:m._id,
        Name:m.Name,
        Email:m.Email,
        City:m.City,
        Movies:movie.data.Movies
  
  
      }


        
      memberAndMovie.data.push(objToPush)
      console.log(memberAndMovie)
     
    
    })
    resolve(memberAndMovie)
  
  }
  const bildArrMovieMmbers = async function(sub,members,arr)
  {
   return new Promise(async(resolve, reject) =>
   {
       
    sub.data.forEach(s=>{
       
       
        if(s.Movies.length!=0){
            for(let counter =0;counter<s.Movies.length;counter++ ){
        
           arr.Data.push({
            movieId:s.Movies[counter].movieId,
            memberName:s.MemberId,
            date:s.Movies[counter].Date
          })
          
            }
        }

         
       })
      
    
       arr.Data.forEach(item=>{
        members.data.forEach(m=>{
          if(m._id==item.memberName){
            item.memberName=m.Name
          }
    
        })
       
       })
    
     

    resolve(arr)

})
}

  


        module.exports = {getAllSub,DelateSubBL,AddSubBL,UpdateSubrBL,getIdobjectSubMachToMemberId,getSubByIdBL,BildobjectMemberAndMovie,printFiles,bildArrMovieMmbers}