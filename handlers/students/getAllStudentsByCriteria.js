const { validateJWTToken, mySQLCommander } = require('../../utils')
const { GET_V2_VIOLATION_STUDENTS } = require('../../config/sqlOperations')

const getAllStudentsByCriteria = async (request, response) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const { query } = request
        const {
            educ_level_id = ''
        } = query || {}

        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

       const {
            error_message_sql,
            results_sql,
            success_sql
        } =  await mySQLCommander({
            sqlQuery: GET_V2_VIOLATION_STUDENTS,
            params: [
                educ_level_id
            ]
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

module.exports = getAllStudentsByCriteria