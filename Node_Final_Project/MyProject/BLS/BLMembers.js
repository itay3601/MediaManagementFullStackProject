const DalMembers =require('../Dals/MembersDal')

const getAllMembers = async function()
{
    return new Promise(async(resolve, reject) =>
        {
           let  allMembers= await DalMembers.getMembers()

            resolve(allMembers)




        })}

        const DelateMemberBL =  function(id)
        {
         return new Promise(async(resolve, reject) =>
         {
         let  resp= await DalMembers.DaleteMember(id)
  
          resolve(resp)
  
      })}

      const AddMemberBL = async function(obj)
          {
           return new Promise(async(resolve, reject) =>
           {
           let  resp= await DalMembers.addMember(obj)

            resolve(resp)

        })}

        const UpdateMemberBL = async function(obj,id)
        {
         return new Promise(async(resolve, reject) =>
         {
         let  resp= await DalMembers.UpdateMember(obj,id)

          resolve(resp)

      })}
        module.exports = {getAllMembers,DelateMemberBL,AddMemberBL,UpdateMemberBL}