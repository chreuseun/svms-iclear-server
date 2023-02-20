const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { INSERT_ONE_DEPARTMENT_V2 } = require('../../config/sqlOperations')


const addOneDepartment =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)



        const {
            department_name = null, 
            department_type= null, 
            academic_level = null, 

            academic_department = null, 
            yearlevel = ull, 
            course = null,

            head_officer = null
        } = request?.body || {}


       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                department_name,
                academic_level,
                department_type,
                course,
                yearlevel,
                academic_department,
                head_officer
            ],
            sqlQuery: INSERT_ONE_DEPARTMENT_V2
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

module.exports = addOneDepartment