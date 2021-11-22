
const express = require('express');

const router = express.Router();

const BL = require('../BL_WS/Bl_ws');






router.route('')
.post(async function(req,resp)
{   
    
    let obj = req.body;
   
    let status = await BL.addMembers(obj)
    return resp.json(status);
})



router.route('/')
    .get(async function(req,resp)
    {
        let pers = await BL.getAllMembers();
        return resp.json(pers);
    })


    router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;

        let status = await BL.deleteMember(id)
        return resp.json(status);
    })
    router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        
        let status = await BL.updateMember(id,obj)
        return resp.json(status);
    })
module.exports = router;