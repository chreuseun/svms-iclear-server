const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {
    SELECT_USERS_BY_FILTER_NO_DATES,
    SELECT_USERS_BY_FILTER_WITH_DATES
} = require('../../config/sqlOperations')
const {toWildCard} = require('../../utils')

const getAccountsByFilters = async ( request , response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {query} = request
        const  {
            date_start = '',
            date_end = '',
            text = '',
            type = '',
            locked ='',
            state = ''
        } = query || {}
          
        let sqlQuery = SELECT_USERS_BY_FILTER_NO_DATES
        let params = [
            toWildCard(text, false),
            toWildCard(type),
            toWildCard(locked),
            toWildCard(state),
        ]
        let resultsIndex = 4

        if(date_start && date_end){
            sqlQuery = SELECT_USERS_BY_FILTER_WITH_DATES
            params = [
                toWildCard(text, false),
                toWildCard(type),
                toWildCard(locked),
                toWildCard(state),
                date_start,
                date_end
            ]
            resultsIndex=6
        }
    
        const {
            results_sql, 
            success_sql,
            error_message_sql
        } = await mySQLCommander({sqlQuery, params})

        data = {
            results: results_sql?.[resultsIndex] || []
        }

        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data,
            route: request.route,
            query:request.query
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

module.exports = getAccountsByFilters