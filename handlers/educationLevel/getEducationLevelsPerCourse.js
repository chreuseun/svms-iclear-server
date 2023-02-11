const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {
    SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_COURSE,
    SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_YEARLEVEL
} = require('../../config/sqlOperations')


const getEducationLevelsPerCourse = async(request, response) => {
    let success = false
    let error_message = null
    let data = null
    
    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {
            error_message_sql: error_message_sql_by_course,
            results_sql:course,
            success_sql:success_by_course
        } =  await mySQLCommander({
            sqlQuery: SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_COURSE,
            params: []
        })

        const {
            error_message_sql: error_message_sql_by_yearlevel,
            results_sql: yearlevel,
            success_sql: success_by_yearlevel
        } =  await mySQLCommander({
            sqlQuery: SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_YEARLEVEL,
            params: []
        })

        response.json({
            success: success_by_course && success_by_yearlevel,
            error_message: `${error_message_sql_by_course}, ${error_message_sql_by_yearlevel}`,
            data: {
                course,
                yearlevel
            },
            route: request.route,
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

module.exports = getEducationLevelsPerCourse