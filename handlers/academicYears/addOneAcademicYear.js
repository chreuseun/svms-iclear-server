const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { INSERT_ONE_ACADEMIC_YEAR } = require('../../config/sqlOperations')


const addOneAcademicYear =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {
            baseyear = null
        } = request?.body || {}

        if(!Number(baseyear)){
            throw new Error('Invalid baseyear value')
        }

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                baseyear,
                `${baseyear}-${Number(baseyear)+1}`
            ],
            sqlQuery: INSERT_ONE_ACADEMIC_YEAR
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

module.exports = addOneAcademicYear