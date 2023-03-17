const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { BULK_UPSERT_STUDENTS_BY_DUPLICATE_KEY } = require('../../config/sqlOperations')

const bulkUpsertStudents =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)
        const {
            student_records_array = []
         } = request?.body || {}

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params: [
                student_records_array
            ],
            sqlQuery: BULK_UPSERT_STUDENTS_BY_DUPLICATE_KEY
        });

        response.json({
            success: success_sql,
            error_message:  error_message_sql,
            data:  results_sql,
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

module.exports = bulkUpsertStudents