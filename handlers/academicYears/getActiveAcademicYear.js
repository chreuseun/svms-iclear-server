const { validateJWTToken, mySQLCommander } = require('../../utils')
const { GET_ACTIVE_SEMESTER_AND_ACADEMIC_YEAR } = require('../../config/sqlOperations')

const getActiveAcademicYear = async (request, response) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

       const {
            error_message_sql,
            results_sql,
            success_sql
        } =  await mySQLCommander({
            sqlQuery: GET_ACTIVE_SEMESTER_AND_ACADEMIC_YEAR,
            params: []
        })
        const semester = results_sql?.[0];
        const academic_year = results_sql?.[1];

        
        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data: {
                semester,
                academic_year
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

module.exports = getActiveAcademicYear