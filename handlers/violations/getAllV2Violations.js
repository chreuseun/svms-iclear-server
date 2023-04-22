const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {
    GET_ALL_V2_VIOLATIONS
} = require('../../config/sqlOperations')

const getAllV2Violations = async ( request , response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const { query } = request
        const  {
            educ_level_id = '',
            is_active = true
        } = query || {}

        let params = [
            educ_level_id,
            is_active
        ]

        const {
            results_sql, 
            success_sql,
            error_message_sql
        } = await mySQLCommander({
            sqlQuery: GET_ALL_V2_VIOLATIONS, 
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

module.exports = getAllV2Violations