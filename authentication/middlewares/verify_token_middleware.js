const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../../util/logger');

function verifyAccessToken(req, res, next) {

    try{

        let accessToken = req.headers['x-access-token'];

        if(!accessToken){
            res.status(403).send({status: false, message: 'AccessToken required'})
        }
        else{
            jwt.verify(accessToken, config.jwt_secret, (err, decoded) => {

                if(err)
                    res.status(403).send({status: false, message: 'Invalid AccessToken. Access Denied'});
                else
                    req.user_id = decoded.id;
    
                next();
            });
        }

    } catch(err){
        res.status(500).send({status: false, message: 'Error verifying token'});
        logger.error('Error verifying token');
    }

}

module.exports = {
    verifyAccessToken
}