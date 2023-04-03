const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {
    GET_STUDENT_DEPT_CLEARANCE_RECORD_BY_FILTER,
    
} = require('../../config/sqlOperations')

const getStudentDeptClearanceRecordByFilter = async ( request , response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {query} = request
        const  {
            v2_students_department_clearance_record
        } = query || {}
          
        let params = [
            v2_students_department_clearance_record
        ]

   
        const {
            results_sql, 
            success_sql,
            error_message_sql
        } = await mySQLCommander({
            sqlQuery:GET_STUDENT_DEPT_CLEARANCE_RECORD_BY_FILTER, 
            params
        })

        console.log('--v2_students_department_clearance_record:',v2_students_department_clearance_record)

     

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

module.exports = getStudentDeptClearanceRecordByFilter