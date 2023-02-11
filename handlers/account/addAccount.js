const bcrypt = require('bcryptjs');

const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const {SALT_COUNT} = require('../../config/bcrypt')
const {INSERT_ONE_ACCOUNT} = require('../../config/sqlOperations')

/*
    *** Test Params ***
    const sqlParams = [
        'ADMIN',
        'TEST_ADMIN_12', 
        bcrypt.hashSync('password', SALT_COUNT),
        'VENTURA, SAI BULAONG',
        'VENTURA',
        'SAI',
        'BULAONG' || '',
        '09223145678'
    ]
*/

const addAccount = async ( request , response ) => {
    let success = false
    let error_message = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {
            user_type_id,
            username,
            password = '',
            lastname,
            firstname,
            middlename,
            contact_number
        } = request?.body || {}
 
        const fullName = `${lastname}, ${firstname} ${middlename || ''}`

        const sqlParams = [
            user_type_id,
            username, 
            bcrypt.hashSync(password, SALT_COUNT),
            fullName,
            lastname,
            firstname,
            middlename || '',
            contact_number
        ]

        const {
            error_message_sql,
            success_sql,
            results_sql
        } = await mySQLCommander({
            sqlQuery: INSERT_ONE_ACCOUNT,
            params: sqlParams
        })

        response.json({
            success: success_sql,
            error_message: error_message_sql,
            data:{ 
                results: results_sql
            },
            route: request.route,
        
        });

    } catch (err){
        error_message = `${err}`
        response.json({
            success,
            error_message,
            data: null,
            route: request.route,

        });
    }

    console.log(`** ${request.method}: ${JSON.stringify(request.route,null,4)}`)
}

module.exports = addAccount