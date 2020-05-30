var jwtVerify = require('../../reuse/jwtVerify');
var query = require('../../reuse/query')

const asyncStudentInsertBulkCSV = async ({res, token, params}) => {
    
    let error  = false;    
    let jwtResult;
    let sqlResult;

    try{
        jwtResult= await jwtVerify(token);

        console.log('insertPaymentHistory: ', jwtResult);
        
        params.map(param => {
            param.push(jwtResult.decoded.id || 0)
            return param
        })

    } catch(err) {
        error  = true; 
    }
    
    if(!jwtResult) {
        error  = true; 
    }

    try{
      sqlResult = await query(_sql.insertPaymentHistory, [params] );
    } catch (err){
        error  = true;  
    }

    error ? 
    res.sendStatus(401) : 
    res.json({ data:sqlResult })
}

let _sql = {
    insertPaymentHistory : `
    SET @accountId := 132;
    INSERT IGNORE upload_payment_history
    (studentUsername, amount, paymentDate,uploaded_by)
    VALUE ?;`
}



module.exports =  asyncStudentInsertBulkCSV;


