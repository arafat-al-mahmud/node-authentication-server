const express = require('express');
const router = express.Router();
const logger = require('../../util/logger');
const verifyAccessToken = require('../../authentication/middlewares/verify_token_middleware').verifyAccessToken;

router.put('/edit-profile', verifyAccessToken, (req, res) => {

    if(req.user_id){

        res.status(200).send({status: true, message: 'Profile Update successful !'});

        logger.info(`Profile update successful for user id : ${req.user_id}`);
    }

    
});

module.exports = router;