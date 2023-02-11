const jsonwebtoken = require('jsonwebtoken')

const secretkey = require('../auth/secretkey');  

const decodeJWTToken = (jwtString) => {
    let decodedJWT = null

    try{
        const splitJWT = jwtString.split(' ')[1]
        decodedJWT = jsonwebtoken.verify(splitJWT, secretkey)

    }catch(error){
        decodedJWT = null
    }

    return decodedJWT
}

 module.exports = decodeJWTToken