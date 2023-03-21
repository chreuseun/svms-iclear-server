const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { INSERT_ONE_V2_DEPARTMENT_CLEARANCE_REQUIREMENT_RECORD } = require('../../config/sqlOperations')


const addOneDepartmentClearanceRequirementRecord =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        const validatedJWT = validateJWTToken(jwtToken)
        const { id:creatorAccountId } = validatedJWT
        const {
            v2_departments_id,
            initial_status,
            name,
            description
        } = request?.body || {}

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                 v2_departments_id,
                creatorAccountId,
                initial_status,
                name,
                description 
            ],
            sqlQuery: INSERT_ONE_V2_DEPARTMENT_CLEARANCE_REQUIREMENT_RECORD
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

module.exports = addOneDepartmentClearanceRequirementRecord