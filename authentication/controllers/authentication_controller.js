const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../users/models/user');
const logger = require('../../util/logger');

router.post('/login', async (req, res, next) => {

    try{

        let email = req.body.email;
        let password = req.body.password;

        //don't allow missing or empty credentials
        if(!email || !password)
            res.status(400).send({'authStatus' : false, 'accessToken' : null});

        let user = await User.findUserByEmail(email);

        let isValidLogin = user && bcrypt.compareSync(password , user.password_hash);

        if(isValidLogin){

            let accessToken = jwt.sign({id : user.id}, config.jwt_secret, {expiresIn : config.jwt_expiration_in_seconds});
            
            res.status(200).send({'authStatus' : true, 'accessToken' : accessToken});

            logger.info(`login successful for user with email : ${email}`);
        
        }
        else{
            res.status(401).send({'authStatus' : false, 'accessToken' : null});
            logger.error(`login failed for user with email : ${email}`);
        }

    } catch(err){
        res.status(500).send({'authStatus' : false, 'accessToken' : null});
        logger.error(err)
    }

});

module.exports = router