const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { INSERT_SELECT_BULK_DEPT_CLEARANCE_REQUIREMENT } = require('../../config/sqlOperations')


const insertSelectStudentsDepartmentClearanceRecord =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {
            v2_dept_clearance_id,
            dept_course_id,
            dept_acad_id,
            educ_level_id
        } = request?.body || {}

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                v2_dept_clearance_id ,
                dept_course_id ,
                dept_acad_id ,
                educ_level_id 
            ],
            sqlQuery: INSERT_SELECT_BULK_DEPT_CLEARANCE_REQUIREMENT
        });

        const {affectedRows,message,} = results_sql?.[4] || null

        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data: {
                affectedRows,
                message,
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

module.exports = insertSelectStudentsDepartmentClearanceRecord