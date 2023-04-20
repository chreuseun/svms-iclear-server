const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {
    INSERT_ONE_V2_DEPARTMENT_CLEARANCE_REQUIREMENT_RECORD
} = require('../../config/sqlOperations')
const { INSERT_ONE_ROW_V2_VIOLATIONS } = require('../../config/sqlOperations')

const insertOneV2Violation = async ( request , response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const { body } = request
        const  {
            name = '',
            level = '',
            type = '',
            educ_level_id = ''
        } = body || {}
          
        let params = [
            name,
            level,
            type,
            educ_level_id
        ]

        const {
            results_sql, 
            success_sql,
            error_message_sql
        } = await mySQLCommander({
            sqlQuery: INSERT_ONE_ROW_V2_VIOLATIONS, 
            params
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

module.exports = insertOneV2Violation