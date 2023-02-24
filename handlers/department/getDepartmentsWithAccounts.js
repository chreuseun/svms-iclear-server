const {
    mySQLCommander,
    validateJWTToken,
    parseJSONStringToArray
} = require('../../utils')
const {
    SELECT_ALL_ACCOUNT_IN_DEPARTMENTS
} = require('../../config/sqlOperations')

const getDepartmentsWithAccounts = async (request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {query} = request || {}

        const { 
            department_id = '',
            user_type_ids = "[]"
        } = query || {}

        const userTypeIDs = ["USER","ADMIN","SUBJECT"]

        const params = [
            department_id,
            parseJSONStringToArray(user_type_ids,userTypeIDs )
        ]

       const {
            error_message_sql,
            results_sql,
            success_sql
        } =  await mySQLCommander({
            sqlQuery: SELECT_ALL_ACCOUNT_IN_DEPARTMENTS,
            params
        })
        
        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data: results_sql,
            params
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

module.exports = getDepartmentsWithAccounts