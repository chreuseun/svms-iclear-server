const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { DEACTIVATE_ACCOUNT_TO_DEPARTMENT } = require('../../config/sqlOperations')


const deleteAccountToDepartment =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)


        const {
            account_id,
            department_id
        } = request?.body || {}


        const {
            error_message_sql,
            results_sql,
            success_sql
        } =  await mySQLCommander({
            params:[
                account_id,
                department_id
            ],
            sqlQuery: DEACTIVATE_ACCOUNT_TO_DEPARTMENT
        });

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

    console.log(`** ${request.method}: ${JSON.stringify(request.route, null, 4)} ${JSON.stringify(request?.body,null,4)}`)
}

module.exports = deleteAccountToDepartment