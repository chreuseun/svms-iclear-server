// Requries 'Bearer TOKENxxxxx'
var jwtVerify = require('../../reuse/jwtVerify');

// Requires < SQL > , < ARRAY_PARAMETER >
var query = require('../../reuse/query');

var sql = require('../../../mysql/queries/accounts/Login')

const asyncGetAccounts = async ({res, token, params}) => {
    
    let error  = false;    
    let jwtResult;
    let sqlResult;

    try{
        jwtResult= await jwtVerify(token);
    } catch(err) {
        error  = true; 
    }
    
    if(!jwtResult) {
        error  = true; 
    }

    try{       
        sqlResult = await query(sql.select_blacklist_token, [jwtResult.token, jwtResult.decoded.id])
    } catch (err) {
        error  = true; 
    }
    
    try{
        if(sqlResult[0].is_token === 'AUTH') {
            const {dateStart, dateEnd, text, type, locked, state} = params;
            console.log(params)
            if(dateStart && dateEnd) {
                console.log('DATE')
                sqlResult = await query(_sql.selectUsersWithDate, [
                    `%${text}%`,
                    `%${type}%`,
                    `%${locked}%`,
                    `%${state}%`,
                    `%${dateStart}%`,
                    `%${dateEnd}%`
                 ]);

                 sqlResult=sqlResult[6]
            }else {
                
                sqlResult = await query(_sql.selectUsers, [
                    `%${text}%`,
                    `%${type}%`,
                    `%${locked}%`,
                    `%${state}%`
                 ]);

                 sqlResult=sqlResult[4]
            }
 
           
        }
    } catch (err){
        error  = true;  
    }

    error ? 
        res.sendStatus(401) : 
        res.json({sqlResult:sqlResult})
}

let _sql = {
    selectUsers :  `
                    SET @text := ?;
                    SET @type := ?;
                    SET @locked := ?;
                    SET @state := ?;

                    SELECT 
                        id,
                        user_type_id,
                        username,
                        fullname,
                        lastname,
                        firstname,
                        middlename,
                        state,
                        is_locked,
                        contact_number,
                        created_at,
                        updated_at
                    FROM account

                    WHERE state LIKE @state  
                        AND is_locked LIKE @locked
                        AND user_type_id LIKE @type
                        
                        AND (lastname LIKE @text
                        OR firstname LIKE @text
                        OR middlename LIKE @text
                        OR username LIKE @text)`,

    selectUsersWithDate :  `
                        SET @text := ?;
                        SET @type := ?;
                        SET @locked := ?;
                        SET @state := ?;
                        SET @dateStart := ?;
                        SET @dateEnd := ?;
    
                        SELECT 
                            id,
                            user_type_id,
                            username,
                            fullname,
                            lastname,
                            firstname,
                            middlename,
                            state,
                            is_locked,
                            contact_number,
                            created_at,
                            updated_at
                        FROM account
    
                        WHERE state LIKE @state  
                            AND is_locked LIKE @locked
                            AND user_type_id LIKE @type
                            
                            AND (lastname LIKE @text
                            OR firstname LIKE @text
                            OR middlename LIKE @text
                            OR username LIKE @text)
                            AND DATE(created_at) >= @dateStart
                            AND DATE(created_at) <= @dateEnd`

}


module.exports =  asyncGetAccounts