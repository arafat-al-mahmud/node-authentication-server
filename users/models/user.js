const appRootDir = require('app-root-dir').get();
const loadJsonFile = require('load-json-file');
const bcrypt = require('bcryptjs');

exports.findUserByEmail = (email) => {

    return new Promise((resolve, reject) => {

        loadJsonFile(`${appRootDir}/user_creds.json`)
        .then(user_creds => {

            try{

                let user = user_creds.find( u_cred => u_cred.email == email );

                if(user)
                    user.password_hash = bcrypt.hashSync(user.password, 8);

                resolve(user);

            } catch(err){

                reject(err);
            }
        })
        .catch((err) => {

            reject(err);
        })
    });
}