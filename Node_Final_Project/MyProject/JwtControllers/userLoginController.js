const express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();



router.get('/', function(req, res) {
     //Get the real secret key from db or envinroment variable..
     const RSA_PRIVATE_KEY = 'somekey';
     

    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, RSA_PRIVATE_KEY, function(err, decoded) 
    {
        if (err) 
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        //res.status(200).send(decoded);
        res.status(200).send([{name : 'car'},{name : 'phone'}]);
    });

  });

  module.exports = router;
