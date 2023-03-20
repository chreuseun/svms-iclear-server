const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {
    GET_DEPARTMENT_LIST_BY_ACCOUNT_ID
} = require('../../config/sqlOperations')


const getDepartmentsListByAccountID = async (request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        const validatedJWT = validateJWTToken(jwtToken)
        const { id: accountID = null } = validatedJWT

       const {
            error_message_sql,
            results_sql,
            success_sql
        } =  await mySQLCommander({
            sqlQuery: GET_DEPARTMENT_LIST_BY_ACCOUNT_ID,
            params: [accountID]
        })
        
        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data: results_sql,
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

module.exports = getDepartmentsListByAccountID