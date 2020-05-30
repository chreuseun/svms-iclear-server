/*
    STATUS : NOT
*/

// Requries 'Bearer TOKENxxxxx'
var jwtVerify = require('../../reuse/jwtVerify');

// Requires < SQL > , < ARRAY_PARAMETER >
var query = require('../../reuse/query')

var sql = require('../../../mysql/queries/accounts/Login')

const asyncSetAcadYear = async ({res, token, params}) => {
    
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
    
    // set acadYear
    try{
        if(sqlResult[0].is_token === 'AUTH') {

            let sql = `UPDATE acad_year SET state = IF(base_year = ?, '1', '0')`;

            sqlResult = await query(sql, params[0])
        }
    } catch (err){
        error  = true;  
    }

    error ? 
        res.sendStatus(401) : 
        res.json({ data:sqlResult.insertId})
}

module.exports =  asyncSetAcadYear