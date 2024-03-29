const { validateJWTToken, mySQLCommander } = require('../../utils')
const { GET_ACCOUNT_DETAILS } = require('../../config/sqlOperations')

const getAccountAuthorization = async (request, response) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        const validatedJWT =  validateJWTToken(jwtToken)

       const {
            error_message_sql,
            results_sql,
            success_sql
        } =  await mySQLCommander({
            sqlQuery: GET_ACCOUNT_DETAILS,
            params: [validatedJWT?.id]
        })

        const accountDetails = results_sql?.[0] || null
    
        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data: {
                accountDetails,
            },
        });
    }catch(err){
        error_message = `${err}`
        data = null
        
        response.json({
            success,
            error_message,
            data,
            route: request.route,
        });
    }

    console.log(`** ${request.method}: ${JSON.stringify(request.route, null, 4)}`)
}

module.exports = getAccountAuthorization