
const express = require('express');

const router = express.Router();

const BL = require('../BL_WS/Bl_ws');

router.route('')
.post(async function(req,resp)
{
    let obj = req.body;
   

    let status = await BL.addMovie(obj)
    return resp.json(status);
})








router.route('/')
    .get(async function(req,resp)
    {
        let pers = await BL.getAllMovies();
        console.log("router" +pers.lenght)

        return resp.json(pers);
    })

    router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        
        let status = await BL.updateMovie(id,obj)
        return resp.json(status);
    })

    router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;

        let status = await BL.deleteMovie(id)
        return resp.json(status);
    })
    router.route('/:id')
    .get(async function(req,resp)
    {
        let per = await BL.getMovie(req.params.id)
        return resp.json(per);
    })





module.exports = router;