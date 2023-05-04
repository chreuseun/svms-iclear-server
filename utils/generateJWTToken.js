const jwt = require('jsonwebtoken'); // 1
const secretkey = require('../auth/secretkey'); // 1

const initiateSignJWT = ( payload ) => {
    return(
        new Promise((resolve, reject) => {
            
            jwt.sign(payload, secretkey, { expiresIn: '24h' },function(err, token) {
                if(token){
                    resolve(token)
                }else{
                    reject('token failed');
                }
            }) 

        })
    )
}


const generateJWTToken = async (payloadObject) =>{
   return await initiateSignJWT( payloadObject )
}

module.exports = generateJWTToken