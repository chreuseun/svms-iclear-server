const decodeJWTToken = require('./decodeJWTToken')

const validateJWTToken = (authorizationToken = null) => {
    if(!authorizationToken){
        throw new Error('Missing authorization token')
    }

    const jwtToken = authorizationToken
    const jwt = decodeJWTToken(jwtToken)

    if(!jwt) throw new Error('Invalid Authorization Token')

}

module.exports = validateJWTToken