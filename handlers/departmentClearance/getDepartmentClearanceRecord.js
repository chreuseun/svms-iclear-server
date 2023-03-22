const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { GET_DEPARTMENT_CLEARANCE_REQUIREMENT_BY_DEPARTMENT_ID } = require('../../config/sqlOperations')

const getDepartmentClearanceRecord = async(request, response) =>{
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)
        const {
           v2_department_id = null
        } = request?.query || {}

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                v2_department_id
            ],
            sqlQuery: GET_DEPARTMENT_CLEARANCE_REQUIREMENT_BY_DEPARTMENT_ID
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

    console.log(`** ${request.method}: ${JSON.stringify(request.route, null, 4)}`)
}

module.exports = getDepartmentClearanceRecord