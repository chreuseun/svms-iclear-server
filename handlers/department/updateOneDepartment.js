const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { UPDATE_ONE_DEPARTMENT } = require('../../config/sqlOperations')


const updateOneDepartment =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)


        const {
            department_id,
            department_name = null, 
            department_type= null, 
            academic_level = null, 
            academic_department = null, 
            yearlevel = ull, 
            course = null,
            head_officer = null,
            status = !!status ? 1 : 0
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
                head_officer,
                status,
                department_id
            ],
            sqlQuery: UPDATE_ONE_DEPARTMENT
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

    console.log(`** ${request.method}: ${JSON.stringify(request.route, null, 4)} ${JSON.stringify(request?.body,null,4)}`)
}

module.exports = updateOneDepartment