const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { UPDATE_STUDENT_DEPT_CLEARANCE_RECORD_BY_ID } = require('../../config/sqlOperations')

const updateStudentDeptClearanceRecordByID =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
       const decodedJWT = validateJWTToken(jwtToken)

        const {
            v2_students_department_clearance_record_id,
            status,

        } = request?.body || {}

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                status,
                decodedJWT?.id,
                v2_students_department_clearance_record_id,
            ],
            sqlQuery: UPDATE_STUDENT_DEPT_CLEARANCE_RECORD_BY_ID
        });

        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data: results_sql
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

module.exports = updateStudentDeptClearanceRecordByID