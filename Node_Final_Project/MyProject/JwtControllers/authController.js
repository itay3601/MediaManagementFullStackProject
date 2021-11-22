const express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/login', function(req, res) {
    
    const username = req.body.username;
    const password = req.body.password;

    //if (validateUserNameAndPassword()) {
    if (true) 
    {
       //const userId = findUserIdForUserName(username);
        const userId = "someuserid";
       
       //Get the real secret key from db or envinroment variable..
        const RSA_PRIVATE_KEY = 'somekey';

        var userToken = jwt.sign({ id: userId },
                             RSA_PRIVATE_KEY,
                            {expiresIn: 7200  } // expires in 2 hours
                            );
                            
        res.status(200).send({  token: userToken });
    }
    else
    {
        res.sendStatus(401); 
    }

  });

  module.exports = router;
