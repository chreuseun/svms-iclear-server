const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {
    GET_ALL_DEPARTMENTS_WITH_FILTER
} = require('../../config/sqlOperations')
const {toWildCard} = require('../../utils')


const getAllDepartmentsByFilter = async (request ,response) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {query} = request
        const { 
            department_name = '',
            is_active = ''
        } = query || {}

        const {
            error_message_sql,
            results_sql,
            success_sql
        } =  await mySQLCommander({
            sqlQuery: GET_ALL_DEPARTMENTS_WITH_FILTER,
            params: [
                toWildCard(department_name,false),
                toWildCard(is_active , false)
            ]
        })

        const data = results_sql?.[2] || []
        
        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data: data,
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

module.exports = getAllDepartmentsByFilter