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
        } = query || {}
          
        let sqlQuery = GET_STUDENT_DEPT_CLEARANCE_RECORD_BY_FILTER
        let params = [
        ]

   
        const {
            results_sql, 
            success_sql,
            error_message_sql
        } = await mySQLCommander({sqlQuery, params})

     

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