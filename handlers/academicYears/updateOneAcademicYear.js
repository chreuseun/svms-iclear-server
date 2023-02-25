const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { UPDATE_ACADEMIC_YEAR_BY_ID } = require('../../config/sqlOperations')

const updateAcademicYearByID =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {
            is_active = null,
            id = null
        } = request?.body || {}

        

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                is_active,
                id
            ],
            sqlQuery: UPDATE_ACADEMIC_YEAR_BY_ID
        });

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

module.exports = updateAcademicYearByID