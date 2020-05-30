var jwtVerify = require('../../reuse/jwtVerify');
var query = require('../../reuse/query');
var sql = require('../../../mysql/queries/accounts/Login');

const AddNewViolation = async ({res, token, params}) => {
    
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
        sqlResult = await query(sql.select_blacklist_token_all, [jwtResult.token, jwtResult.decoded.id])
    } catch (err) {
        error  = true; 
    }
    
    try{
        if(sqlResult[0].is_token === 'AUTH') {
            sqlResult = await query(_sql.AddVio , params)
        }
    } catch (err){
        error  = true;  
    }

    error ?
        res.sendStatus(401) : 
        res.json({ data : sqlResult })
}

let _sql = {
    AddVio : `INSERT INTO violation
            (
                name,
                description,
                violation_class_id
                )
            VALUES
            (? , ?, ?)`
}

module.exports =  AddNewViolation