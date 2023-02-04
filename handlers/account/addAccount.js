const bcrypt = require('bcryptjs');

const {
    decodeJWTToken,
    mySQLCommander
} = require('../../utils')
const {SALT_COUNT} = require('../../config/bcrypt')



const addAccount = async ( request , response ) => {
    let success = false
    let error_message = null

    try{
        const jwtToken =request?.headers?.authorization
        const jwt = decodeJWTToken(jwtToken)

        if(!jwt){
            throw new Error('Invalid Authorization Token')
        }

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

        const body = [
            user_type_id,
            username, 
            bcrypt.hashSync(password, SALT_COUNT),
            fullName,
            lastname,
            firstname,
            middlename || '',
            contact_number
        ]

        console.log('--- START SQL')
        const data =   await mySQLCommander({
            sqlQuery: null
        })
        

        success = !!jwt

        


        response.json({
            success,
            error_message,
            route: request.route,
            body,
            data
        });

    } catch (err){
        error_message = `${err}`

        response.json({
            success,
            error_message,
            route: request.route,
        });
    }

 


    console.log(`** ${request.method}: ${JSON.stringify(request.route,null,4)}`)
}

module.exports = addAccount